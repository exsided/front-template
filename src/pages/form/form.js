o2.form =
{
	submit(e)
	{
		let params =
		{
			url: process.env.APP_URL + 'requests/request.json',
			method: 'GET',
			dataType: 'json',
			success: (msg, instance) =>
			{
				console.log(msg, instance);
			}
		};

		O2Validator.handleSubmit(e, params, true, true, this.callbacks);
	},
	callbacks:
	{
		test(field)
		{
			let $input = field.find('input');

			if($input.val() === 'test')
				return true;

			O2Validator.setMessage(field,'Test');
			return false;
		}
	},
};