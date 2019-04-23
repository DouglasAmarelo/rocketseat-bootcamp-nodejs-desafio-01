const express  = require('express');
const nunjucks = require('nunjucks');

const app = express();

nunjucks.configure('views', {
	autoescape: true,
	express: app,
	watch: true
});

app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'njk');
app.listen(3000);

const checkAge = (req, res, next) => {
	const { age: userAge } = req.query;

	if (userAge) {
		return next();
	}

	return res.redirect('/');
};

app.get('/', (req, res) => res.render('index'));

app.get('/major', checkAge, (req, res) => {
	const { age: userAge } = req.query;

	return res.render('major', { userAge });
});

app.get('/minor', checkAge, (req, res) => {
	const { age: userAge } = req.query;

	return res.render('minor', { userAge });
});

app.post('/check', (req, res) => {
	const { age: userAge } = req.body;
	const ageAllowed = 18;

	if (userAge >= ageAllowed) {
		return res.redirect(`/major?age=${userAge}`);
	}

	return res.redirect(`/minor?age=${userAge}`);
});





