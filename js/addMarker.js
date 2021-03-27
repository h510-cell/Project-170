AFRAME.registerComponent("create-markers", {
  
    init: async function() {
  
      var mainScene = document.querySelector("#main-scene");
  
      //get the toys collection from firestore database
      var toys = await this.getToys();
     
      toys.map(toys => {
        var marker = document.createElement("a-marker");   
        marker.setAttribute("id", toys.id);
        marker.setAttribute("type", "pattern");
        marker.setAttribute("url", toys.marker_pattern_url);
        marker.setAttribute("cursor", {
          rayOrigin: "mouse"
        });
  
        //set the markerhandler component
        marker.setAttribute("markerhandler", {});
        mainScene.appendChild(marker);
  
        // Adding 3D model to scene
        var model = document.createElement("a-entity");    
       
        model.setAttribute("id", `model-${toys.id}`);
        model.setAttribute("position", toys.model_geometry.position);
        model.setAttribute("rotation", toys.model_geometry.rotation);
        model.setAttribute("scale", toys.model_geometry.scale);
        model.setAttribute("gltf-model", `url(${toys.model_url})`);
        model.setAttribute("gesture-handler", {});
        marker.appendChild(model);
  
        // Plane Entity
        var mainPlane = document.createElement("a-plane");
        mainPlane.setAttribute("id", `main-plane-${toys.id}`);
        mainPlane.setAttribute("position", { x: 0, y: 0, z: 0 });
        mainPlane.setAttribute("rotation", { x: -90, y: 0, z: 0 });
        mainPlane.setAttribute("width", 1.7);
        mainPlane.setAttribute("height", 1.5);
        marker.appendChild(mainPlane);
  
        // Title Entity in background plane
        var titlePlane = document.createElement("a-plane");
        titlePlane.setAttribute("id", `title-plane-${toys.id}`);
        titlePlane.setAttribute("position", { x: 0, y: 0.89, z: 0.02 });
        titlePlane.setAttribute("rotation", { x: 0, y: 0, z: 0 });
        titlePlane.setAttribute("width", 1.69);
        titlePlane.setAttribute("height", 0.3);
        titlePlane.setAttribute("material", { color: "#F0C30F" });
        mainPlane.appendChild(titlePlane);
  
        // Tile Text Entity
        var toysTitle = document.createElement("a-entity");
        toysTitle.setAttribute("id", `toys-title-${toys.id}`);
        toysTitle.setAttribute("position", { x: 0, y: 0, z: 0.1 });
        toysTitle.setAttribute("rotation", { x: 0, y: 0, z: 0 });
        toysTitle.setAttribute("text", {
          font: "monoid",
          color: "black",
          width: 1.8,
          height: 1,
          align: "center",
          value: toys.toys_name.toUpperCase()
        });
        titlePlane.appendChild(toysTitle);

          // Description Entity
          var toysDescription = document.createElement("a-entity");
          toysDescription.setAttribute("id", `toys-description-${toys.id}`);
          toysDescription.setAttribute("position", { x: 0, y: 0, z: 0.1 });
          toysDescription.setAttribute("rotation", { x: 0, y: 0, z: 0 });
          toysDescription.setAttribute("text", {
            font: "monoid",
            color: "black",
            width: 1.8,
            height: 1,
            align: "center",
            value: toys.toys_description.toUpperCase()
          });
          titlePlane.appendChild(toysDescription);
  
        // Age Text Entity
      var AgeText = document.createElement("a-entity")
      AgeText.setAttribute("id",`age-text-${toys.id}`);
      AgeText.setAttribute("position", {x:0, y:0.5, z:0})
      AgeText.setAttribute("rotation ", {x:0, y:0, z:0})
      AgeText.setAttribute("text" , {
        font:"monoid",
        color:"black",
        width:2,
        align:"center",
        value: `${toys.description.join("\n\n")}`
      })
      mainPlane.appendChild(AgeText)
    });
  },
      
    //function to get the toys collection from firestore database
    getToys: async function() {
      return await firebase
        .firestore()
        .collection("Toys")
        .get()
        .then(snap => {
          return snap.docs.map(doc => doc.data());
        });
    }
  });