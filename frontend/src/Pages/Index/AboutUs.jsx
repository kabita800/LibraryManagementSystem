import React from "react";

const AboutUs = () => {
  return (
    <div className="flex h-115 bg-gradient-to-r from-orange-300 to-orange-500">
      {/* nav bar */}

      <div className="flex-1 flex flex-col pt-10">
        {/* main content */}

        <section id="about" class="">
          <div class="text-center max-w-3xl mx-auto mb-12 px-6">
            <h1 class="text-4xl font-bold text-white mb-4">About Us</h1>
            <p class="text-lg text-gray-600 leading-relaxed text-white">
              <span class="font-semibold text-white"> BOOKVault</span> was
              created to make borrowing books simple for students and community
              members. It helps track books, borrowing history, and supports
              librarians in managing the catalog efficiently. This Library
              Management System is designed to help small libraries, schools,
              and community centers manage their book catalog and borrowing
              process. Borrowers can browse and borrow books easily, while
              librarians can efficiently track records and maintain the catalog.
              Our mission is to make reading accessible to everyone and provide
              a seamless experience for both readers and librarians. We aim to
              promote learning, knowledge sharing, and convenience through
              technology.
            </p>
          </div>

          <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
            <div class="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-2xl  hover:scale-105 transition">
              <i class="fas fa-bullseye text-4xl text-red-600 mb-4"></i>
              <h3 class="text-2xl font-semibold mb-2">Our Mission</h3>
              <hr class="w-16 mx-auto border-b-4 border-red-600 mb-4" />
              <p class="text-gray-600 leading-relaxed">
                To make reading accessible and convenient for everyone while
                supporting librarians in efficient book management.
              </p>
            </div>

            <div class="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-2xl  hover:scale-105 transition">
              <i class="fas fa-lightbulb text-4xl text-yellow-500 mb-4"></i>
              <h3 class="text-2xl font-semibold mb-2">Our Vision</h3>
              <hr class="w-16 mx-auto border-b-4 border-yellow-500 mb-4" />
              <p class="text-gray-600 leading-relaxed">
                To create a community where knowledge is easily shared and
                libraries are efficiently managed through technology.
              </p>
            </div>

            <div class="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-2xl hover:scale-105 transition">
              <i class="fas fa-trophy text-4xl text-green-600 mb-4"></i>
              <h3 class="text-2xl font-semibold mb-2">Our Goals</h3>
              <hr class="w-16 mx-auto border-b-4 border-green-600 mb-4" />
              <p class="text-gray-600 leading-relaxed">
                Enhance library services, simplify borrowing, track records
                effectively, and promote reading habits among all members.
              </p>
            </div>
          </div>

          {/* team member */}
          <div className="m-25 ">
            <div className=" ">
              <h1 className="mt-6 font-bold text-4xl text-center text-gray-800">
                {" "}
                Meet Our Team
              </h1>
              <p className="text-center mb-15 italic">
                The people powering our vision
              </p>
            </div>

            <div className="grid grid-cols-3 pl-14 pb-4 ">
              <div className="bg-gray-100 border border-gray-300 border-2 text-black text-bold text-lg rounded-full shadow-2xl w-70 h-30 flex items-center gap-4 p-4 hover:bg-orange-400 hover:scale-105 text-black hover:text-white">
                <img
                  src="./src/assets/IMG-20231104-WA0001.jpg"
                  className="rounded-full w-26 h-26 p-1 object-cover  border border-white border-2 "
                />
                <div className=" justify-center items-center">
                  <h1 className="font-bold">Kabita Giri</h1>
                  <p>Founder</p>
                </div>
              </div>

              <div className="bg-gray-100 border border-gray-300 border-2 text-bold text-lg rounded-full shadow-2xl w-70 h-30 flex items-center gap-4 p-4 hover:bg-orange-400 hover:scale-105 text-black hover:text-white">
                <img
                  src="./src/assets/man.webp"
                  className="rounded-full w-26 h-26 p-1 object-cover border border-white border-2 "
                />
                <div className=" justify-center items-center ">
                  <h1 className="font-bold">John Smith</h1>
                  <p className="">Manager</p>
                </div>
              </div>

              <div className="bg-gray-100 pt-6 border border-gray-300 border-2 text-black text-bold text-lg rounded-full shadow-2xl w-70 h-30 flex items-center gap-4 p-4 hover:bg-orange-400 hover:scale-105 text-black hover:text-white">
                <img
                  src="./src/assets/lady.png"
                  className="rounded-full w-26 h-26 p-1 object-cover  border border-white border-2  "
                />
                <div className=" justify-center items-center">
                  <h1 className="font-bold">Olivia Morgan</h1>
                  <p>UI/UX Designer</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
