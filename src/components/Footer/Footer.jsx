import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

function Footer() {
  return (
    <footer className="footer bg-gray-200 h-fit p-4lg:p-16">
      <div className="container mx-auto p-4 md:p-6 lg:p-8">
        <div className="flex flex-wrap justify-center mb-4">
          {/* <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900 transition duration-300 ease-in-out mr-4"
          >
            <i className="fab fa-facebook-f text-2xl" />
          </a> */}
          {/* <a
            href="https://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900 transition duration-300 ease-in-out mr-4"
          >
            <i className="fab fa-twitter text-2xl" />
          </a> */}
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900 transition duration-300 ease-in-out mr-4"
          >
            <i className="fab fa-instagram text-2xl" />
          </a>
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900 transition duration-300 ease-in-out mr-4"
          >
            <i className="fab fa-linkedin-in text-2xl" />
          </a>
        </div>
        <p className="text-gray-600 text-center mb-4">
          Copyright 2024  &copy; Renish Chandera. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;