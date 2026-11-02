const { LoginPage } = require("./loginPage.js")
const { ProductPage } = require("./productPage.js")
const { DashboardPage } = require("./dashboardPage.js")

exports.BasePage = class BasePage {

    constructor(page){
        this.login = new LoginPage(page)
        this.productPage = new ProductPage(page)
        this.dashboardPage = new DashboardPage(page)
    }

}
