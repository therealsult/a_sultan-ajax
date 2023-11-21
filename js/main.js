(() => {

  //variables
  const model = document.querySelector("#model");
  const hotspots = document.querySelectorAll(".Hotspot");

  const hotspotTemplate = document.querySelector("#hotspot-template");

  
  const materialTemplate = document.querySelector("#material-template");
  const materialList = document.querySelector("#material-list");

  const materialCon = document.querySelector("#material-con");

  //functions
  function modelLoaded() {
    hotspots.forEach(hotspot => {
      hotspot.style.display = "block";
    });
  }

  function loadInfoBoxes() {

    //Using fetch to connect with Marco's API

    fetch("https://swiftpixel.com/earbud/api/infoboxes")
    .then(response => response.json())
    .then(infoBoxesGet => {
      console.log(infoBoxesGet);

      infoBoxesGet.forEach((infoboxes, index) => {

        const clone = hotspotTemplate.content.cloneNode(true);

        let selected = document.querySelector(`#hotspot-${index+1}`);

        const hotspotImage = clone.querySelector(".hotspot-img");
        hotspotImage.src = `images/${infoboxes.thumbnail}`;
  
        const hotspotTitle = clone.querySelector(".title-hotspot");
        hotspotTitle.textContent = infoboxes.heading;
  
        const hotspotText = clone.querySelector(".p-hotspot");
        hotspotText.textContent = infoboxes.description;
        
        selected.appendChild(hotspotImage);
        selected.appendChild(hotspotTitle);
        selected.appendChild(hotspotText);
    });

    })

        //Error handling
        .catch(error => {
          document.body.innerHTML = `Unable to load content. Please try again later... || Error message: ${error}`;
          console.error("Unexpected Error:", error)
        });
  }
  
  loadInfoBoxes();

  function loadMaterialInfo() {
    //displays a spinner while waiting for the API

    materialCon.classList.add("spinner");

     fetch("https://swiftpixel.com/earbud/api/materials")
    .then(response => response.json())
    .then(materialInfo => {
      console.log(materialInfo);
      
      materialInfo.forEach(material => {

        materialCon.classList.remove("spinner");

      //make a copy of the template
      const clone = materialTemplate.content.cloneNode(true);

      //fill the template
      const materialHeading = clone.querySelector(".material-heading");
      materialHeading.textContent = material.heading;

      const materialDescription = clone.querySelector(".material-description");
      materialDescription.textContent = material.description;

      //append the populated template to the ul
      
      materialList.appendChild(clone);

    });

      

    })

    //Error handing

    .catch(error => {
      document.body.innerHTML = `Unable to load content. Please try again later... || Error message: ${error}`;
      console.error("Unexpected Error:", error)
    });

  }

  loadMaterialInfo();

  function showInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 1 });
  }

  function hideInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 0 });
  }

  //Event listeners
  model.addEventListener("load", modelLoaded);

  hotspots.forEach(function (hotspot) {
    hotspot.addEventListener("mouseenter", showInfo);
    hotspot.addEventListener("mouseleave", hideInfo);
  });

})();

