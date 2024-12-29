import { expect } from '@playwright/test'

class WebActions {
	constructor(page) {
		this.page = page
	}

	async open(url) {
		return await this.page.goto(url)
	}

	async getTitle() {
		return await this.page.title()
	}

	async pause() {
		return await this.page.pause()
	}

	async getUrl() {
		return this.page.url()
	}


	async waitAndClick(selector) {
		return await this.page.click(selector)
	}

	
	async waitAndFill(selector, text) {
		return await this.page.fill(selector, text)
	}

    async waitForPageLoad() {
		return await this.page.waitForLoadState('domcontentloaded')
	}
	async verifyElementText(selector, text) {
		const textValue = await this.page.textContent(selector)
		return expect(textValue.trim()).toBe(text)
	}

	async verifyElementContainsText(selector, text) {
		const locatorText = await this.page.locator(selector)
		return await expect(locatorText).toContainText(text)
	}
	

	async verifyElementAttribute(selector, attribute, value) {
		const textValue = await this.page.getAttribute(selector, attribute)
		return expect(textValue.trim()).toBe(value)
	}

	
	async isElementVisible(selector, errorMessage) {
		const element = this.page.locator(selector)
		try {
			const isVisible = await element.isVisible()
			expect(isVisible).toBeTruthy()
		} catch (error) {
			throw new Error(`${errorMessage}`)
		}
	}

	async isElementEnabled(selector, errorMessage) {
		const element = this.page.locator(selector)
		try {
			const isEnabled = await element.isEnabled()
			expect(isEnabled).toBeTruthy()
		} catch (error) {
			throw new Error(`${errorMessage}`)
		}
	}

	
}
export default WebActions
