import { test, expect } from '@playwright/test';
import { BasePage } from '../pages/_basePage.js';

const getConfig = require('../configReader'); // Import helper
const config = getConfig(); // Get data from YAML

test.describe('Login Page Functionality @login @regression @milken', () => {
    let pages;    

    test.beforeEach(async ({ page }) => {
        pages = new BasePage(page);
        await pages.login.goToLoginPage(config.base_url);
    });

    test('As a user, I can log in with a valid username and valid password @case1 @positive', async ({ page }) => {
        await pages.login.doLogin(config.credentials.valid_username, config.credentials.valid_password)
        await expect(page).toHaveURL(/dashboard/);
        await expect(pages.login.verifyLogin).toBeVisible();
    });

    test('As a user, I cannot log in with a valid username but an invalid password @case2 @negative', async ({ page }) => {
        await pages.login.doLogin(config.credentials.valid_username, config.credentials.invalid_password)
        await expect(pages.login.invalidCredsErrorMessage).toBeVisible();
    });

    test('As a user, I cannot log in with an invalid username and a valid password @case3 @negative', async ({ page }) => {
        await pages.login.doLogin(config.credentials.invalid_username, config.credentials.valid_password)
        await expect(pages.login.invalidCredsErrorMessage).toBeVisible();
    });

    test('As a user, I cannot log in with an invalid username and an invalid password @case4 @negative', async ({ page }) => {
        await pages.login.doLogin(config.credentials.invalid_username, config.credentials.invalid_password)
        await expect(pages.login.invalidCredsErrorMessage).toBeVisible();
    });

    test('As a user, I cannot log in with a valid username and an empty password @case5 @negative', async ({ page }) => {
        await pages.login.doLogin(config.credentials.valid_username, "")
        await expect(pages.login.requiredErrorMessage).toHaveCount(1);
    });

    test('As a user, I cannot log in with an empty username and a valid password @case6 @negative', async ({ page }) => {
        await pages.login.doLogin("", config.credentials.invalid_password)
        await expect(pages.login.requiredErrorMessage).toHaveCount(1);
    });

    test('As a user, I cannot log in with an invalid username and an empty password @case7 @negative', async ({ page }) => {
        await pages.login.doLogin(config.credentials.invalid_username, "")
        await expect(pages.login.requiredErrorMessage).toHaveCount(1);
    });

    test('As a user, I cannot log in with an empty username and an invalid password @case8 @negative', async ({ page }) => {
        await pages.login.doLogin("", config.credentials.invalid_password)
        await expect(pages.login.requiredErrorMessage).toBeVisible();
    });

    test('As a user, I cannot log in with an empty username and an empty password @case9 @negative', async ({ page }) => {
        await pages.login.doLogin("", "")
        await expect(pages.login.requiredErrorMessage).toHaveCount(2);
    });

})