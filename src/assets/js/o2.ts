/**
 * инициализация всех инициализаций
 */
$(document).ready(function(): void
{
	window.o2.init();
});

/**
 * основной объект
 */
window.o2 =
{
	/**
	 * вызов функций, которые должны запускаться при загрузке страницы
	 */
	init(): void
	{
	},
	/**
	* отслеживание клика вне блока
	*/
	clickOutside(element, callback): any
	{
		const outsideChecker = (event) =>
		{
			const container = $(element);

			if (!container.is(event.target) && container.has(event.target).length === 0)
			{
				document.removeEventListener('click', outsideChecker);
				callback();
			}
		};

		document.addEventListener('click', outsideChecker);

		return outsideChecker;
	},
};