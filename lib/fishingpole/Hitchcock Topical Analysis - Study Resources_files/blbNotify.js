/*
	PURPOSE: Including this file will cause an on-page-load notification to be displayed for a pre-determined amount of time on whatever page it is included on.
	USAGE: BLBNotify.config is used to customize the content and appearance of the notification, BLBNotify.render is used to render the notification.
*/

(function() {
	BLBNotify = {
		config: {		// This gets called when the DOM is ready
			title: "Maintenance Reminder",
			body: "The Blue Letter Bible website will be unavailable for a 2 hour maintenance period beginning June 2nd, 11:00PM CDT. Thank you for your patience and understanding.",
			id: 0, 													// **MUST INCREMENT THIS WITH EVERY NEW NOTIFICATION** Used to track whether or not the user has seen this notification before
			icon: '/apple-touch-icon.png', 	// Image to show for the icon
			attachNode: 'menuTop', 					// ID value of the page element to attach this notification to
			position: 'below',							// attach 'above' or 'below' the attachNode
			timeout: 5000, 									// Time to show in milliseconds (disabled if actionRequired == true)
			actionRequired: false, 					// Indicates whether to wait for user interaction before closing
			dateStart: null,  							// Indicates the date (in GMT time) to begin showing the notification
			dateEnd: null, 									// Indicates the date (in GMT time) to stop showing the notification
			persistent: false, 							// If true, display every time regardless of whether the user has already seen this notification
			showEvery: 3										// if not null, then show every n days even if dismissed
		},
		render: function() {
			var cfg = BLBNotify.config;
			var now = new Date();
		// Decide whether or not to show the notification
				// If cfg.persistent === true always show, always
			if  (cfg.persistent === true || 
				// Check if cfg.showEvery is not null and if its been long enough since the last dismiss to show again
					(cfg.showEvery != null && localStorage.getItem('blb_notifyDismissTime') != null && (new Date() - new Date(localStorage.getItem('blb_notifyDismissTime'))) > cfg.showEvery * 86400000) ||
				// If they've never seen it before, show it to them
					localStorage.getItem('blb_notifyDismiss') == null || localStorage.getItem('blb_notifyDismiss').indexOf(cfg.id) < 0 ||
				// If the date ranges are not null, and its within the date ranges 
			 		(localStorage.getItem('blb_notifyDismiss').indexOf(cfg.id) < 0 && cfg.dateStart != null && cfg.dateEnd != null && cfg.dateStart > now && cfg.dateEnd < now)) 
			{
			// Create the notification content
				var div = document.createElement('div');
				div.className = 'blbNotifyContainer';
				var content = document.createElement('div');
				content.className = 'notifyContent';
				div.appendChild(content);
				// icon
					var icon = document.createElement('img');
					icon.className = 'blbNotifyImage';
					icon.src = cfg.icon;
					content.appendChild(icon);
				// title
					var title = document.createElement('span');
					title.className = 'blbNotifyTitle';
					title.innerHTML = cfg.title+':';
					content.appendChild(title);
				// body
					var body = document.createElement('span');
					body.className = 'blbNotifyBody';
					body.innerHTML = cfg.body;
					content.appendChild(body);
			// Place the content
				var node = document.querySelector('#'+cfg.attachNode);
				if (node != null) {
					var top = node.getBoundingClientRect()[cfg.position];
					if (cfg.position == 'top') {
						top -= div.getBoundingClientRect().height;
					}
					div.style.top = top+'px';
				}
				else {
					div.style.top = '0px';
				}
			// Place the closer
				var closer = document.createElement('div');
				div.appendChild(closer);
				closer.className = 'notifyCloser';
				closer.innerHTML = '&times;'
				closer.addEventListener("click", BLBNotify.dismiss);
				document.querySelector('body').appendChild(div);
			}
		},
		dismiss: function() {
		// Hide the notification and add an entry to the browser localstorage to show this particular notification was dismissed
			var cfg = BLBNotify.config;
			var notiflys = document.querySelectorAll('.blbNotifyContainer');
			var dismissList = [];
			if (localStorage.getItem('blb_notifyDismiss') != null) {
				dismissList = localStorage.getItem('blb_notifyDismiss');
			}
			if (dismissList.indexOf(cfg.id) < 0) {
				dismissList.push(cfg.id);
				localStorage.setItem('blb_notifyDismiss', dismissList);
			}
			// Reset the dismiss date
			localStorage.setItem('blb_notifyDismissTime', new Date());
			for (var i = 0; i < notiflys.length; i++) {
				notiflys[i].classList.remove('blbNotifyShow');
				notiflys[i].classList.add('blbNotifyHide');
			}
		}
	};
document.addEventListener('DOMContentLoaded', BLBNotify.render, false);
})();