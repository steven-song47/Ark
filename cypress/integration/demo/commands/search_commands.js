// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

/// <reference types="cypress" />

describe('基本语法-查找', function () {
    beforeEach(() => {
      cy.visit('https://www.jianshu.com/')
    })

    it('get基本用法 .get(selector)', function () {
      // 根据id查找
      cy.get("#q").should("exist")
      // 根据class查找
      cy.get(".search-input").should("exist")
      // 根据元素属性查找
      cy.get("input[name='q']").should("exist")
    })

    it('find基本用法 .find(selector)', function () {
      // 根据父元素查找子元素，find不可直接使用
      cy.get("form[target='_blank']").find("input[type='text']").should("exist")
    })

    it("contains基本用法 .contains(content) .contains(selector, content)", function () {
      // 直接查找content，语法：.contains(content)
      cy.contains("登录").should("exist")
      // 通过selector查找content
      cy.contains("#sign_in", "登录").should("exist")
      // 通过正则表达式查找content
      cy.contains(/[\u4e00-\u9fa5]{2}/).should("exist")
    })

    it("辅助定位方法", function () {
      // .children(selector) 获取元素子元素
      // 注意：.children()和.find()的区别
      cy.get("form[target='_blank']").children("#q").should("exist")
      // cy.get("body").find("#sign_in").should("exist")
      // .parents() 获取元素的所有父元素
      cy.log(cy.get("#q").parents())
      // .parent() 获取元素的上一级父元素
      cy.get("#q").parent().should("have.attr", "target", "_blank")
      // .siblings() 获取元素的所有同级元素
      cy.get("#q").siblings().should("have.attr", "name", "utf8")
      // .first() 获取对象集的第一个元素
      cy.get("form[target='_blank']").children().first().should("have.attr", "name", "utf8")
      // .last() 获取对象集的最后一个元素
      cy.get("form[target='_blank']").children().last().should("have.class", "search-btn")
      // .next() 获取元素后紧跟着的下一个同级元素
      cy.get("input[name='utf8']").next().should("have.id", "q")
      // .nextAll() 获取元素后的所有同级元素
      cy.get("input[name='utf8']").nextAll().first().should("have.id", "q")
      // .nextUntil(selector) 获取元素后的所有同级元素，直到查到selector，但是不包括selector
      cy.get("input[name='utf8']").nextUntil(".search-btn").first().should("have.id", "q")
      // .prev() .prevAll() .prevUntil()类似next系列
    })
  })