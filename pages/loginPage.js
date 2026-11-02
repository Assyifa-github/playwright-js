exports.LoginPage = class LoginPage {
    constructor(page){
        this.page = page    
        this.txtUsername = page.getByRole('textbox', {name: 'username'});
        this.txtPassword = page.getByRole('textbox', {name: 'password'});
        this.btnLogin = page.getByRole('button', { name: 'Login' });
        this.verifyLogin = page.locator('img.oxd-userdropdown-img');
        this.invalidCredsErrorMessage = page.getByText('Invalid credentials');
        this.requiredErrorMessage = page.getByText('Required');
        // this.txtPassword = page.locator('#password');
        // this.txtUsername = page.getByTestId('work-email');
        // this.verifyLogin = page.locator('img[alt="profile picture"]');
    }

    async goToLoginPage(base_url){
        await this.page.goto(base_url);
    }

    async doLogin(username, password){
        await this.txtUsername.fill(username)
        await this.txtPassword.fill(password)
        await this.btnLogin.click()
    }

}