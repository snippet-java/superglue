//helper section allows module to be tested easily as forms
//get displays forms, and submit on the form as post
//shows processed results
module.exports = {

		GET: function(req, res, params, unitpath) {
//			console.log({ path: [req.params, req.query, req.body]});

			var fs = require('forms');
			var forms = require('forms');
			var fields = forms.fields;

			var result = [];
			for (var p in params) {
				if( params.hasOwnProperty(p) ) {
					result[p] = fields.string({ required: true }); // obj[p]
				}
			}

			var htmlStr = fs.readFileSync("form.html", "utf8");	
			htmlStr = htmlStr.replace(/{{path}}/g, unitpath).replace(/{{inputs}}/g, forms.create(result).toHTML());
//			console.log(htmlstr);

			res.writeHead(200, { 'Content-Type': 'text/html' });
			res.write(htmlStr);
			res.end();
		},

		POST: function(req, res, process) {
//			console.log({'input': [req.params, req.query, req.body]});
			
			// ensure ALL MANDATORY params are passed via req.body
			params = req.body;

			process(params,function(err, data) {
				if (err) res.json(err); else res.json(data);
			});
		}
}