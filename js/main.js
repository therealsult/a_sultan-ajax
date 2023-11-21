(() => {
  // variables
  const model = document.querySelector("#model");
  const hotspots = document.querySelectorAll(".Hotspot");

  const materialTemplate = document.querySelector("#material-template");
  const materialList = document.querySelector("#material-list");

  // URLs for API calls
  const infoBoxesUrl = "https://swiftpixel.com/earbud/api/infoboxes";
  const materialsUrl = "https://swiftpixel.com/earbud/api/materials";

  // functions
  function handleAjaxError(xhr, textStatus, errorThrown) {
    console.error("AJAX request failed:");
    console.error("Status: " + textStatus);
    console.error("Error: " + errorThrown);
    // You can perform additional actions here, such as showing an error message to the user.
  }

  function loadInfoBoxes() {
    fetch(infoBoxesUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(infoBoxes => {
        console.log(infoBoxes);

        infoBoxes.forEach((infoBox, index) => {
          const selected = document.querySelector(`#hotspot-${index + 1}`);

          if (selected) { // Check if the selected element exists
            // Clear existing content
            selected.innerHTML = "";

            const titleElement = document.createElement('h2');
            titleElement.textContent = infoBox.heading;

            const textElement = document.createElement('p');
            textElement.textContent = infoBox.description;

            selected.appendChild(titleElement);
            selected.appendChild(textElement);
          } else {
            console.warn(`Hotspot not found for index ${index + 1}`);
          }
        });
      })
      .catch(error => handleAjaxError(null, null, error));
  }

  function loadMaterialInfo() {
    fetch(materialsUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(materialvar => {
        console.log(materialvar);

        materialvar.forEach(material => {
          const clone = materialTemplate.content.cloneNode(true);

          const materialHeading = clone.querySelector(".material-heading");
          materialHeading.textContent = material.heading;

          const materialDescription = clone.querySelector(".material-description");
          materialDescription.textContent = material.description;

          materialList.appendChild(clone);
        });
      })
      .catch(error => handleAjaxError(null, null, error));
  }

  function showInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 1 });
  
    // Set the data-visible attribute to make the hotspot visible
    selected.setAttribute('data-visible', 'true');
  }
  
  function hideInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 0 });
  
    // Remove the data-visible attribute to hide the hotspot
    selected.removeAttribute('data-visible');
  }
  
  // Event listeners
  model.addEventListener("load", () => {
    loadInfoBoxes();
    loadMaterialInfo();
  });

  hotspots.forEach(function (hotspot) {
    hotspot.addEventListener("mouseenter", showInfo);
    hotspot.addEventListener("mouseleave", hideInfo);
  });

  // Initial data loading
  loadInfoBoxes();
  loadMaterialInfo();
})();
