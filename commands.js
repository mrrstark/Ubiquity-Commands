/* Some personal Ubiquity Commands
 * 
 */

CmdUtils.CreateCommand({
	/* Based on Royall's original quicky script:
	 * http://gist.github.com/16507
	 */
  names: ["luck"],
  icon: "chrome://ubiquity/skin/icons/google.ico",
  author: { name: "Ransom Stark"},
  license: "GPL",
  description: "Perform an I'm Feeling Lucky google search on the preview pane",
  help: "Go to first result of search term in Google",
  arguments: [ {role: 'object', nountype: noun_arb_text}],
  preview: function( pblock, args ) {
    var searchTerm = args.object.text;
    if (searchTerm.length == 0) {
        pblock.innerHTML = "<b>Please enter a search term</b>";
        return;
    }
    var msg = "Going to... <b>" + address + "</b>!";
    pblock.innerHTML = msg;
  },
  execute: function(args) {
    var searchTerm = args.object.text;
    if(searchTerm.length) {
      Utils.openUrlInBrowser("http://www.google.com/search?ie=utf-8&btnI=&q=" + searchTerm);
    }
  }
});

CmdUtils.CreateCommand({ 
  names: ["to"],
  icon: "chrome://ubiquity/skin/icons/tab_go.png",
  author: { name: "Ransom Stark"},
  license: "GPL",
  description: "Go to address",
  help: "Go to the given address",
  arguments: [ {role: 'object', nountype: noun_arb_text}],
  preview: function( pblock, args ) {
    var address = args.object.text;
    if (address.length == 0) {
        pblock.innerHTML = "<b>Please enter an address</b>";
        return;
    }
    var msg = "Going to... <b>" + address + "</b>!";
    pblock.innerHTML = msg;
  },
  execute: function(args) {
    var address = args.object.text;
    if(address.length) {
      Utils.openUrlInBrowser(address);
    }
  }
});


CmdUtils.CreateCommand({ 
  names: ["reader", "rdr"],
  icon: "http://www.google.com/reader/ui/favicon.ico",
  author: { name: "Ransom Stark"},
  license: "GPL",
  description: "Go to Reader",
  help: "Go to Reader",
  preview: function( pblock, args ) {
    pblock.innerHTML = "Go to Google Reader";
  },
  execute: function(args) {
	  Utils.openUrlInBrowser("http://reader.google.com");
  }
});


CmdUtils.CreateCommand({ 
  names: ["go to tag", "open tag"],
  icon: "chrome://mozapps/skin/places/tagContainerIcon.png",
  author: { name: "Ransom Stark"},
  license: "GPL",
  description: "Searches tagged bookmarks for the given tag and opens it.",
  help: "Provide a tag previously applied to a page and the command will open the page.",
  arguments: [ {role: 'object', nountype: noun_type_tag}],
  preview: 
	  function( pblock, args ) 
	  {
	  	var msg;	  
	  	var tagSvc = Components.classes["@mozilla.org/browser/tagging-service;1"]
	                                    .getService(Components.interfaces.nsITaggingService);
	  	var tag = args.object.text;	  	
	  	var uris = tagSvc.getURIsForTag(tag);
	  	if(uris.length)
	  	{
	  		msg = "We're heading to: " + uris[0].spec;
	  	}
	  	else
	  	{
	  		msg = "I can't find the tag " + tag + ".";
	  	}
	  	pblock.innerHTML = msg;
	  },
  execute: 
	  function(args)
	  {
		  var tagSvc = Components.classes["@mozilla.org/browser/tagging-service;1"]
		                                  .getService(Components.interfaces.nsITaggingService);
		  var tag = args.object.text;
		  var uris = tagSvc.getURIsForTag(tag);
		  if(uris.length)
		  {
			  Utils.openUrlInBrowser(uris[0].spec);
		  }
	  }
});

CmdUtils.CreateCommand({
	// Modified to 0.5 API
	names: ["gbk search"],
	icon: "chrome://ubiquity/skin/icons/google.ico",
	author: {name: "James Maidment", email: "james@mouseboks.org.uk"},
	license: "GPL",
	description: 'Search your Google Bookmarks',
	help: '',
	arguments: [ {role: 'search', nountype: noun_type_tag}],

	preview: function(pblock, args) {

		CmdUtils.previewGet(
				pblock,
				'http://www.google.com/bookmarks/find',
				{'q': args.search.text}, function(data) {
					if (data.search("ServiceLogin") != -1) {
						pblock.innerHTML = 'Please check you are logged in to <a href="http://www.google.com/bookmarks/">Google Bookmarks</a>';
						return;
					}
					pblock.innerHTML = CmdUtils.renderTemplate('<ul>{for bookmark in bookmarks}<li><a href="${bookmark.title}">${bookmark.innerHTML}</a></li>{forelse}No search results found.{/for}</ul>', {bookmarks: jQuery('a[title]', data).get()});
				});
	},

	execute: function(args) {
		Utils.openUrlInBrowser("http://www.google.com/bookmarks/find?q=" + encodeURIComponent(args.search.text));
	}
});
