/*
CourseSearch for UCLA
coursesearch.js

Copyright (c) 2015-2018 Kevin Hsieh. All Rights Reserved.
*/

// -----------------------------------------------------------------------------
// GLOBALS
// -----------------------------------------------------------------------------

const app = {
  version: "v1.3.0",
  update_api: "https://api.github.com/repos/kahsieh/coursesearch-ucla/releases/latest"
};

const depts = {
  "BE": "BIOENGR",
  "CE": "CH ENGR",
  "CEE": "C&EE",
  "CS": "COM SCI",
  "EE": "EC ENGR",
  "ECE": "EC ENGR",
  "MSE": "MAT SCI",
  "MAE": "MECH&AE"
}

// -----------------------------------------------------------------------------
// UTILITIES
// -----------------------------------------------------------------------------

function id(str) {
  return document.getElementById(str);
}

// -----------------------------------------------------------------------------
// APPLICATION
// -----------------------------------------------------------------------------

addEventListener("load", () => {
  id("app-version").innerText = app.version;
  let req = new XMLHttpRequest();
  req.open("GET", app.update_api);
  req.onreadystatechange = () => {
    if (!(req.readyState == 4 && (!req.status || req.status == 200))) {
      return;
    }
    const res = JSON.parse(req.responseText);
    if (res.tag_name && res.tag_name > tag) {
      id("update-bar").classList.remove("hide");
      id("update-link").href = res.html_url;
    }
  }
  req.send();
  main();
});

function main() {
  let term, dept;
  while (true) {
    const input = prompt("CourseSearch for UCLA\n\n"
      + "Enter the term code, followed by the department abbreviation.\n"
      + "Example: 16W MATH", "").toUpperCase().split(" ");
    if (input.length < 2) {
      alert("Invalid input. Please try again.");
      continue;
    }

    term = input[0];
    if (term.length != 3 || isNaN(term[0]) || isNaN(term[1])) {
      alert("Invalid term. Please try again.");
      continue;
    }

    dept = input.slice(1).join(" ");
    if (depts[dept]) {
      dept = depts[dept];
    }
    break;
  }
  window.location = "https://sa.ucla.edu/ro/Public/SOC/Results"
    + `?t=${term}&sBy=subject&sName=${dept}&subj=${dept}`
    + "&crsCatlg=Enter+a+Catalog+Number+or+Class+Title+%28Optional%29";
  id("message").innerText = `Loading ${term} ${dept}...`;
}
