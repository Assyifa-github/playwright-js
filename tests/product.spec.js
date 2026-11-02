import { test } from '@playwright/test';
import { BasePage } from '../pages/_basePage.js';

const getConfig = require('../configReader');
const config = getConfig();

test.describe('Product Page views @product @regression', () => {
    let pages;

    test.beforeEach(async ({ page }) => {
        pages = new BasePage(page);
        await pages.login.goToLoginPage(config.base_url);
        await pages.login.doLogin(config.credentials.valid_username, config.credentials.valid_password);
    });

    test('As a user, I can see the product page @product @positive @regression', async () => {
        await pages.productPage.assertProductPage();
    });

    test('As a user, I can add one product to the cart @product @positive @regression', async () => {
        const productName = 'Essence Mascara Lash Princess';
        await pages.productPage.addProductToCart(productName);
        await pages.productPage.assertProductInCart(productName);
    });
});
