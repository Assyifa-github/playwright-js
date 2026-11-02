const { expect } = require('@playwright/test');

exports.ProductPage = class ProductPage {
    constructor(page){
        this.page = page
        this.shopSection = page.locator('#prooood')
        this.btnProceedToCheckout = page.getByRole('button', { name: 'PROCEED TO CHECKOUT' })
        this.btnAddToCart = page.getByRole('button', { name: 'ADD TO CART' })
        this.productTitle = page.locator('.shop-item-title')
    }

    async gotoProductPage(base_url){
        await this.page.goto(base_url);
    }

    async assertProductPage(){
        await expect(this.shopSection).toBeVisible();
        await expect(this.btnProceedToCheckout).toBeVisible();
        await expect(this.productTitle.first()).toBeVisible();
        await expect(this.btnAddToCart.first()).toBeVisible();
    }

    addToCartButton(productName){
        return this.page
            .locator('.shop-item')
            .filter({ has: this.page.getByText(productName, { exact: true }) })
            .getByRole('button', { name: 'ADD TO CART' })
    }

    cartItem(productName){
        return this.page.locator('.cart-items').getByText(productName, { exact: true })
    }

    async addProductToCart(productName){
        await this.addToCartButton(productName).click()
    }

    async assertProductInCart(productName){
        await expect(this.cartItem(productName)).toBeVisible()
    }
}
