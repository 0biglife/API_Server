const express = require('express');
const router = express();

// http://localhost:3000/ 

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const users = [
	{ id: 1, name: 'user01' },
	{ id: 2, name: 'user02' },
	{ id: 3, name: 'user03' },
];

router.get('/', (req, res) => {
	res.send('Server for API TEST!');
});

router.get('/api/users', (req, res) => {
	res.json({ ok: true, users: users });
});

//param 사이에 & 입력.!
router.get('/api/users/user', (req, res) => {
	const user_id = req.query.user_id;

	const user = users.filter(data => data.id == user_id);

	res.json({ ok: false, user: user });
});

//아래 코드는 왜 필요하지?
// router.get('/api/users/userBody', (req, res) => {
// 	const user_id = req.body.user_id;
// 	const user = users.filter(data => data.id == user_id);

// 	res.json({ ok: false, user: user });
// });

// : <- 이거는 type 모두 가능하단 뜻
router.get('/api/users/:user_id', (req, res) => {
	const user_id = req.params.user_id;
	const user = users.filter(data => data.id == user_id);

	res.json({ ok: true, user: user });
});

//POST 방식!! 드디어..
router.post("/api/users/add", (req, res) => {
  
  const user = {
		id: users.length + 1,
		name: req.body.name,
	};

  users.push(user);
  
  res.json({ok: true, users: user})
})

//서버 돌리는 것
router.listen(3000, () => console.log('0BigLife Server :)'));
