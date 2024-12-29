import { expect } from "@playwright/test"
import WebActions from '../lib/webActions'
import fs from 'fs'
 
export const username_textbox = '#username'
export const password_textbox = '#password'
export const login_button = '#submit'
export const loginSuccessHeader = '.post-title'
export const loginSuccessSubHeader = '//p/strong'
export const logout = 'text=Log out'
export const error_msg = 'div[id=error]'
const testData = JSON.parse(fs.readFileSync(`./config/testConfig.json`, `utf-8`))
class LoginPage extends WebActions {
	constructor(page) {
		super(page)
	}
    async openApp() {
		await super.open(testData.resource)
		return await super.waitForPageLoad()
	}
    async usernameFieldVisible() {
		return await this.isElementVisible(username_textbox, 'username text box is not visible')
	}

	async passwordFieldVisible() {
		return await this.isElementVisible(password_textbox, 'password text box is not visible')
	}

	async loginButtonIsEnabled() {
		return await this.isElementEnabled(login_button, 'submit button is not visible')
	}

    async verifyLoginPageTitle()
    {
        return await this.getTitle()
    }

    async loginToApplication(username , password) {
		await this.waitAndFill(username_textbox, username)
		await this.waitAndFill(password_textbox, password)
		await this.waitAndClick(login_button)
	}
    async verifyPresenceOfSuccessLogin() {
         await this.isElementEnabled(loginSuccessHeader, 'successHeader is not visible')
         await this.isElementEnabled(loginSuccessSubHeader, 'successSubHeader button is not visible')
         await this.verifyElementText(loginSuccessHeader,'Logged In Successfully')
         await this.verifyElementText(loginSuccessSubHeader,'Congratulations student. You successfully logged in!')

    }

    async logoutButtonVisible() {
		return await this.isElementVisible(logout, 'logout button is not visible')
	}

    async verifyPresenceOfError(condition) {
        await this.isElementVisible(error_msg, 'error message is not visible')

        //await expect(this.error_msg).toHaveCSS('background-color', 'rgb(227, 72, 72)')

        if (condition === 'username') {
            await  this.verifyElementText(error_msg,'Your username is invalid!')
        }
        else {
            await  this.verifyElementText(error_msg,'Your password is invalid!')
        }

    }
}
export default LoginPage
