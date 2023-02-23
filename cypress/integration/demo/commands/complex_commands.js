// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

/// <reference types="cypress" />

describe('命令集合', function () {
	context('操作页面元素的命令', function() {
		beforeEach(() => {
			cy.visit("https://www.jianshu.com/")
		})

		it('.scrollIntoView() 指定元素滑动到可视视图左上角', function() {
			cy.get(".note-list").children("li").eq(2).find(".content").scrollIntoView({duration: 2000})
		})

		it('.scrollTo() 滑动浏览器自带的滚动条', function() {
			cy.scrollTo("bottom")
		})
	})

	context('获取页面全局对象的命令', function() {
		beforeEach(() => {
			cy.visit("https://www.jianshu.com/")
		})

		it('.title() 获取页面标题', function() {
			cy.title().should("contain", "简书")
		})

		it('.url() 获取当前URL', function() {
			cy.url().should("contain", "https://www.jianshu.com/")
		})

		it('.window() 获取当前页面的window对象', function() {
			cy.log(cy.window())
		})

		it('.root() 获取根元素', function() {
			cy.get("form[target='_blank']").within(() => {
				cy.get("#q").should("have.attr", "name", "q")
				cy.root().should("have.attr", "method", "get")
			})
		})
	})

	context('操作浏览器的命令', function() {
		beforeEach(() => {
			cy.visit("https://www.jianshu.com/")
		})

		it('.go() 在浏览器历史记录上，访问前一个或后一个URL', function() {
			cy.get("#sign_in").click()
			cy.go(-1).url().should("contain", "https://www.jianshu.com/")
			cy.go(1).url().should("contain", "https://www.jianshu.com/sign_in")
		})

		it('.reload() 刷新页面', function() {
			cy.reload()
			cy.reload(true)
		})
	})

	context('操作上一条命令返回结果的命令', function() {
		it('.wrap() 返回对象', function() {
			// 声明一个对象
			cy.wrap({num:1}).should("have.property", "num").and("eq", 1)
			// 与.as()结合，使用变量别名
			cy.wrap({num:1}).as("obj")
			cy.get("@obj").then((o) => {
				cy.log(o.num)
			})
		})
		
		it('.invoke() 对前一条命令返回的结果进行方法调用', function() {
			// .invoke(functionName)
			// .invoke(options, functionName)
			// .invoke(functionName, args...)
			// .invoke(options, functionName, args...)
			cy.wrap({num: () => {return 1}}).invoke("num").should("eq", 1)
			cy.visit("https://www.jianshu.com/")
			cy.get("input[name='utf8']").invoke("show")
		})

		it('.spread() 将数组拆分成多个参数', function() {
			// .spread(callbackFn)
			// .spread(options, callbackFn)
			const arr = ["a", "b", "c"]
			cy.wrap(arr).spread((first, middle, last) => {
				expect(first).to.eq("a")
				expect(middle).to.eq("b")
				expect(last).to.eq("c")
			})
		})
	})

	context('操作文件相关命令', function() {
		it('.fixture() 用于加载位于fixture中的数据', function() {
			// cy.fixture(filePath)
			// cy.fixture(filePath, encoding)
			// cy.fixture(filePath, options)
			// cy.fixture(filePath, encoding, options)
			cy.fixture("users.json").as("user")
			cy.get("@user").then((user) => {
				cy.log(user[0].name)
			})
		})

		it.skip('.readFile() 读取文件并返回内容', function() {
			// cy.readFile(filePath)
			// cy.readFile(filePath, encoding)
			// cy.readFile(filePath, options)
			// cy.readFile(filePath, encoding, options)
			// read json file
			cy.readFile("cypress/fixtures/diff_type_data/user.json").each((text)=> {
				cy.wrap(text).its("name").then((name) => {
					if (name === "Leanne Graham") {
						cy.wrap(text).as("Bret")
					}
				})
			})
			cy.get("@Bret").then((person) => {
				cy.log(`Bret: ${JSON.stringify(person)}`)
			})
			// read txt file
			cy.readFile("cypress/fixtures/diff_type_data/user.txt").then((text) => {
				expect(text).not.to.be.empty
			})
			// read yaml file
			cy.readFile("cypress/fixtures/diff_type_data/user.yaml").then((yaml) => {
				const YAML = require("yamljs")
				const con = YAML.parse(yaml)
				cy.log(con)
			})
			// read mp3 file
			cy.readFile("cypress/fixtures/diff_type_data/music.mp3", "base64").then((mp3) => {
				const uri = "data:audio/mp3;base64," + mp3
				const audio = new Audio(uri)
				audio.play()
			})
		})

		it('.writeFile() 写入内容到文件中', function() {
			// cy.writeFile(filePath, contents)
			// cy.writeFile(filePath, contents, encoding)
			// cy.writeFile(filePath, contents, options)
			// write json file
			cy.writeFile("cypress/fixtures/diff_type_data/tmp.json", {"key": "just test"})
			// write txt file
			cy.writeFile("cypress/fixtures/diff_type_data/user.txt", "OK.", {flag: "a+"})
		})
	})

	context('操作网络相关命令', function() {
		it('.request() 用于发起一个http请求', function() {
			// cy.request(url)
			// cy.request(url, body)
			// cy.request(method, url)
			// cy.request(method, url, body)
			// cy.request(options)
			// options 参数包括：log,url,method,auth,body,form,encoding,headers等
			cy.request("https://www.jianshu.com/")
			cy.request({
				method: "get",
				url: "https://www.jianshu.com/"
			}).as("response")
			cy.get("@response").then((r) => {
				expect(r.status).to.be.eq(200)
			})
		})

		it('.server() .route() 启动服务器，管控网络请求', function() {
			// 已被.intercept()命令取代
		})

		it('.intercept() 在网络层管理http请求', function() {
			// cy.intercept(url, routeHandler?)
			// cy.intercept(method, url, routeHandler?)
			// cy.intercept(routeMatcher, routeHandler?)
			cy.visit("https://www.jianshu.com/")
			// cy.intercept("https://www.jianshu.com/p/*").as("read")
			// cy.get(".note-list").children().first().find(".title").click()
			// cy.wait("@read").then((res) => {
			// 	cy.log(res)
			// 	expect(res.response.statusCode).to.be.eq(200)
			// 	expect(res.request.url).to.match(/[/w/:///.]+p[/w//]+/)
			// })
			// routeHandler定义了对请求的指定处理，可接受类型：string,object,Function,staticResponse
			cy.intercept("https://www.jianshu.com/p/*", "success").as("read")
			cy.get(".note-list").children().first().find(".title").click()
			cy.wait("@read").then((res) => {
				cy.log(res)
				expect(res.response.statusCode).to.be.eq(200)
				expect(res.response.body).to.be.eq("success")
			})
			// 
			// cy.intercept("https://www.jianshu.com/p/*", (req, res) => {
			// 	console.log("回调函数", req, res)
			// }).as("read")
			// cy.get(".note-list").children().first().find(".title").click()
			// cy.wait("@read").then((res) => {
			// 	cy.log(res)
			// 	expect(res.response.statusCode).to.be.eq(200)
			// })
		})
	})

	context('其它命令', function() {
		it.only('.end() 命令链的中止', function() {
			cy.visit("https://www.jianshu.com/")
			cy.get("#q").end().then(($el) => {
				cy.log($el)
			})
		})
		
		it('.exec() 执行系统命令', function() {
			// cy.exec(command)
			// cy.exec(command, options)
			// 返回一个对象，包含属性：code（0成功，1失败）、stderr、stdout
			cy.exec("echo song").its("stdout").should("contain", "song")
		})

		it('.screenshot() 屏幕截屏或元素截图', function() {
			// .screenshot()
			// .screenshot(fileName)
			// .screenshot(options)
			// .screenshot(fileName, options)
			cy.visit("https://www.jianshu.com/")
			cy.screenshot()
			cy.get("#q").screenshot("搜索")
		})
	})
})