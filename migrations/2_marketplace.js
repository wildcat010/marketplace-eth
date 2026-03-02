const CourseMarketplace = artifacts.require("CourseMarketplaceZep");

module.exports = function (deployer) {
  deployer.deploy(CourseMarketplace);
};
