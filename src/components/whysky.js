import React from "react";
import locallyHostedImg from "../images/locally-hosted.png";
import costEffectiveImg from "../images/cost-effective.png";
import interactiveGuiImg from "../images/interactive-gui.png";
import enhancedSecurityImg from "../images/enhanced-security.png";
import provisioningImg from "../images/ease-of-provisioning.png";

function WhySkyCloud() {
  return (
    <section className="bg-gray-50 py-20 h-[250%]">
      <div className="container mx-auto px-4 md:px-12">
        {/* Title */}
        <h2 className="text-center text-2xl md:text-3xl font-bold text-gray-800 mb-8">
          Why SkyCloud
        </h2>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-8 text-center">
          <div className="flex flex-col items-center">
            <img
              src={locallyHostedImg}
              alt="Locally Hosted"
              className="w-12 h-12 mb-4"
            />
            <h3 className="text-sm font-bold text-gray-800">Locally Hosted</h3>
            <p className="text-xs text-gray-600 mt-2">
              Our cloud infrastructure is hosted in Pakistan offering real-time
              data management and computing services with low-latency virtual
              servers.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <img
              src={costEffectiveImg}
              alt="Cost Effective"
              className="w-12 h-12 mb-4"
            />
            <h3 className="text-sm font-bold text-gray-800">Cost Effective</h3>
            <p className="text-xs text-gray-600 mt-2">
              A locally hosted data center means lower costs with easy payments
              in rupees.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <img
              src={interactiveGuiImg}
              alt="Interactive GUI"
              className="w-12 h-12 mb-4"
            />
            <h3 className="text-sm font-bold text-gray-800">Interactive GUI</h3>
            <p className="text-xs text-gray-600 mt-2">
              Manage your cloud platform through a simply designed interface.
              Add, remove, commission, and resize your virtual machines.
            </p>
          </div>

          <div className="flex flex-col items-center md:col-start-2 lg:-translate-x-28">
            <img
              src={enhancedSecurityImg}
              alt="Enhanced Cloud Security"
              className="w-12 h-12 mb-4"
            />
            <h3 className="text-sm font-bold text-gray-800">
              Enhanced Cloud Security
            </h3>
            <p className="text-xs text-gray-600 mt-2">
              Manage and segregate security policies to minimize the chances of
              security incidents.
            </p>
          </div>

          <div className="flex flex-col items-center md:col-start-3 lg:-translate-x-20">
            <img
              src={provisioningImg}
              alt="Ease of Provisioning"
              className="w-12 h-12 mb-4"
            />
            <h3 className="text-sm font-bold text-gray-800">
              Ease of Provisioning
            </h3>
            <p className="text-xs text-gray-600 mt-2">
              Set up your dedicated servers to suit your cloud computing needs
              with flexible infrastructure options.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhySkyCloud;
