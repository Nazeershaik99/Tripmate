
  // Navbar Toggle
  const navbarToggle = document.querySelector('.navbar-toggler');
  const navbarCollapse = document.querySelector('.navbar-collapse');

  navbarToggle.addEventListener('click', () => {
    navbarCollapse.classList.toggle('show');
  });

  // Changing Content on Homepage
 // const locations = ['Taj Mahal', 'Goa', 'Manali', 'Jaipur', 'Kerala', 'Udaipur', 'Varanasi', 'Rajasthan', 'Mumbai', 'Agra'];
  let index = 0;
  
  const changeContent = document.querySelector('.changecontent');
  
  function changeLocation() {
    changeContent.textContent = locations[index];
    index = (index + 1) % locations.length;
  }
  
  // Change location every 3 seconds
  setInterval(changeLocation, 3000);
  
  // Smooth Scroll for Navigation Links
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

  navLinks.forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      
      window.scrollTo({
        top: targetElement.offsetTop - 70,  // Adjust scroll position for navbar
        behavior: 'smooth'
      });
    });
  });

  const express = require("express");
  const webpush = require("web-push");
  const bodyParser = require("body-parser");
  const path = require("path");
  
  const app = express();
  
  // Set static path
  app.use(express.static(path.join(__dirname, "client")));
  
  app.use(bodyParser.json());
  
  const publicVapidKey =
    "BJthRQ5myDgc7OSXzPCMftGw-n16F7zQBEN7EUD6XxcfTTvrLGWSIG7y_JxiWtVlCFua0S8MTB5rPziBqNx1qIo";
  const privateVapidKey = "3KzvKasA2SoCxsp0iIG_o9B0Ozvl1XDwI63JRKNIWBM";
  
  webpush.setVapidDetails(
    "mailto:test@test.com",
    publicVapidKey,
    privateVapidKey
  );
  
  // Subscribe Route
  app.post("/subscribe", (req, res) => {
    // Get pushSubscription object
    const subscription = req.body;
  
    // Send 201 - resource created
    res.status(201).json({});
  
    // Create payload
    const payload = JSON.stringify({ title: "Push Test" });
  
    // Pass object into sendNotification
    webpush
      .sendNotification(subscription, payload)
      .catch(err => console.error(err));
  });
  
  const port = 5000;
  
  app.listen(port, () => console.log(`Server started on port ${port}`));