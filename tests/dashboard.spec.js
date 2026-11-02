import { test, expect } from '@playwright/test';
import { BasePage } from '../pages/_basePage.js';

const getConfig = require('../configReader');
const config = getConfig();

test.describe('Product Page views @product @regression', () => {
    let pages;

    test.beforeEach(async ({ page }) => {
        pages = new BasePage(page);
        await pages.login.goToLoginPage(config.base_url);
        await pages.login.doLogin(config.credentials.valid_username, config.credentials.valid_password);
        await expect(page).toHaveURL(/\/dashboard/);
        await expect(pages.dashboardPage.attendanceChart).toBeVisible({timeout: 20000});
    });

    test('As a user, I can see the dashboard page @dashboard1 @positive @regression', async () => {
        await pages.dashboardPage.assertDashboardPage();
    });

});