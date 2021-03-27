AFRAME.registerComponent("MarkerHandler", {
init: async function() {

    this.el.addEventListener("makerFound",()=>{
        console.log("marker is found")
        this.handleMarkerFound()
    });

    this.el.addEventListener("makerLost",()=>{
        console.log("marker is lost")
        this.handleMarkerLost()
    });
},
  handleMarkerFound: function(){
      //Change the button div visiblity
      var buttonDiv = document.getElementById("button-div")
      buttonDiv.style.display = "flex"

      var ratingButton = document.getElementById("rating-button")
      var orderButton = document.getElementById("order-button")

      //Handling click Events
      ratingButton.addEventListener("click", ()=>{
          swal({
              icon : "warning",
              title : "Rate The Toy",
              text : "Work In Progress"
          })
      })

      orderButton.addEventListener("click", ()=>{
        swal({
            icon : "./assets/thumps-up-colored.png",
            title : "Thanks For Your Order",
            text : "It Will Be Parcelled to Your House"
        })
    })
  },

  handleMarkerLost: function (){
    //Change the button div visiblity
    var buttonDiv = document.getElementById("button-div")
    buttonDiv.style.display = "none"
  }
})
