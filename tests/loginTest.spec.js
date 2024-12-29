import test from '../lib/basePage'
import { expect } from '@playwright/test'
import fs from 'fs'
const testData = JSON.parse(fs.readFileSync(`./config/testConfig.json`, `utf-8`))

test('Valid Login Page - UI Elements', async ({ loginPage }) => {

    await loginPage.openApp()
    await loginPage.usernameFieldVisible()
    await loginPage.passwordFieldVisible()
    await loginPage.loginButtonIsEnabled()
    expect(await loginPage.verifyLoginPageTitle()).toBe('Test Login | Practice Test Automation')
});

test('Valid Login Page - Valid Credentials', async ({ loginPage }) => {

    await loginPage.openApp()
    await loginPage.loginToApplication(testData.username, testData.password)
    expect(await loginPage.verifyLoginPageTitle()).toBe('Logged In Successfully | Practice Test Automation')
    await loginPage.verifyPresenceOfSuccessLogin()
    await loginPage.logoutButtonVisible()
});

test('Valid Login Page - Invalid Credentials - Username', async ({ loginPage }) => {

    await loginPage.openApp()
    await loginPage.loginToApplication('invalidstudent', 'Password123')
    await loginPage.verifyPresenceOfError('username')
});

test('Valid Login Page - Invalid Credentials - Password', async ({ loginPage }) => {

    await loginPage.openApp()
    await loginPage.loginToApplication('student', 'Password1234567')
    await loginPage.verifyPresenceOfError('password')
});