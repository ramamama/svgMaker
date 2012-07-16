function showWidget(widgetType,affichage){
	if (typeof window[widgetType] === 'function') {
		window[widgetType]("show");
	}
}//end function



