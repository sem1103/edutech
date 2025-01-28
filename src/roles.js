
const roles = {
	director : [
		{
			value : 'home',
			edit : true
		},
		{
			value : 'director',
			edit : false
		},
		{
			value : 'staff',
			edit : true
		},
		{
			value : 'teacher',
			edit : true
		},
		{
			value : 'parent',
			edit : true
		},
		{
			value : 'student',
			edit : true
		},
		{
			value : 'filials',
			edit : true
		},
		{
			value : 'control',
			edit : true
		},
		{
			value : 'registration',
			edit : true
		}
	],
	staff : [
		{
			value : 'home',
			edit : true
		},
		{
			value : 'directors',
			edit : false
		},
		{
			value : 'staff',
			edit : false
		},
		{
			value : 'teachers',
			edit : true
		},
		{
			value : 'parents',
			edit : true
		},
		{
			value : 'students',
			edit : true
		},
		{
			value : 'filials',
			edit : true
		},
		{
			value : 'control',
			edit : true
		}
	],
	teacher : [
		{
			value : 'home',
			edit : true
		},
		{
			value : 'staff',
			edit : false
		},
		{
			value : 'teachers',
			edit : false
		},
		{
			value : 'parents',
			edit : false
		},
		{
			value : 'students',
			edit : false
		}
	],
	parent : [
		{
			value : 'home',
			edit : true
		},
		{
			value : 'teachers',
			edit : false
		},
		{
			value : 'parents',
			edit : false
		},
		{
			value : 'students',
			edit : false
		}
	],
	student : [
		{
			value : 'home',
			edit : true
		},
		{
			value : 'teachers',
			edit : false
		},
		{
			value : 'students',
			edit : false
		}
	]
};



export default roles;


