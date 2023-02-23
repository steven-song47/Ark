// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

/// <reference types="cypress" />

import getScriptPath from "../../../helper/get_path"

describe('扩展延伸场景', function () {
	it('调用python文件', function () {
        const scriptPath = getScriptPath("analysis_img_code.py")
        var c_string = new Array();
        c_string.push("python3", scriptPath)
        var command = c_string.join(" ")
        cy.exec(command).then((result) => {
            cy.log(`result: ${JSON.stringify(result)}`)
            expect(result.stdout).to.be.eq("nVNA")
        })
    })
})