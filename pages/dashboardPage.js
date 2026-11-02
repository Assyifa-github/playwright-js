const { expect } = require('@playwright/test');
const getConfig = require('../configReader');

exports.DashboardPage = class DashboardPage {
    constructor(page){
        this.page = page
        this.attendanceChart = page.locator('div.emp-attendance-chart');
        this.applyLeaveButton = page.locator('button[title="Apply Leave"]');
        this.timesheetButton = page.locator('button[title="My Timesheet"]');
        this.shopSection = page.locator('#prooood')
        this.btnProceedToCheckout = page.getByRole('button', { name: 'PROCEED TO CHECKOUT' })
        this.btnAddToCart = page.getByRole('button', { name: 'ADD TO CART' })
        this.productTitle = page.locator('.shop-item-title')
    }

    async gotoDashboardPage(){
        const url = new URL(getConfig().base_url);
        await this.page.goto(`${url}/dashboard`);
    }

    async assertDashboardPage(){
        await expect(this.attendanceChart).toBeVisible();
        await expect(this.applyLeaveButton).toBeVisible();
        await expect(this.timesheetButton).toBeVisible({timeout: 20000});
    }
}