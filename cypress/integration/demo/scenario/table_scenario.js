// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

/// <reference types="cypress" />

describe('数据表格操作相关场景', function () {
	it('获取表格中目标文案的表格行', function () {
		cy.visit("http://zwfw.hubei.gov.cn/webview/bszn/bmsy.html?department=11420000010833209R")
		cy.get(".table_style2", {timeout: 5000}).should("be.visible")
		cy.get(".table_style2").find("tbody tr").each(($el, index, $table) => {
			if ($el.text().includes("个人权益记录查询打印")) {
				cy.log(index)
				// $table.eq(index).children(".qdbtn").should("have.class", "qdbtn")
			}
		})
	})
})