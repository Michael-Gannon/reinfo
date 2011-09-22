/*
proper auto complete

cat</span>Dump file from directory.');
less</span>Dump in a less'ish way a file from directory.'); -< nice to have

 */
function dbg(txt) { if (window.console) console.log(txt); }

function JsFile(_node) {
    var node = $(_node);

    this.is_dir   = node[0].nodeName.toString().indexOf('JSFS:DIR')  != -1;
    this.is_root  = node[0].nodeName.toString().indexOf('JSFS:ROOT') != -1;
    
    this.parent   = this.is_root ? null : new JsFile(node.parent());
    this.filename = this.is_root ? '\\' : node.attr('name');

    this.files = function() {
        files = [];

        for(i=0; i<node.children().length; i++)
            files[i] = new JsFile(node.children()[i]);

        return files;
    };
}


var Terminal = function(container) {

    var terminal = container;

    var commandHistory = [];
    var commandHistoryIndex = -1;

    var currentCommand = null;
    var currentPrompt = null;

    var current_dir = new JsFile($('jsfs\\:root'));

    var initialize = function(container) {
        out('Welcome to <a id="welcomelink" href="http://mikgan.com">mikgan.com</a>.');
        out('Type \'help\' for a list of available commands.');
        out('&nbsp;');
        prompt();

        $('welcomelink').focus();
        setInterval(function(){ $('.cursor').toggle(); }, 500);

        $(document).keydown(function(event) { keydown(event); }.bind(this));
        $(document).keypress(function(event) { keypress(event); }.bind(this));
        return this;
    };

    // Process keystrokes
    var keydown = function(event) {
        dbg('keydown> ' + String.fromCharCode(event.keyCode) + '(' + event.keyCode + ') ' + event.ctrlKey + ' - ' + event.shiftKey + ' - ' + event.altKey + ' - ' + event.metaKey);
        if (event.ctrlKey /*|| event.shift*/ || event.altKey || event.metaKey) return;
        var command = currentCommand.html();

        if (event.keyCode == 13) {
            event.preventDefault();
            run();
            return;
        }

        if (event.keyCode == 8) {
                event.preventDefault();
                if (command.substr(command.length-6) == '&nbsp;') {
                        command = command.substr(0, command.length-6);
                } else {
                        command = command.substr(0, command.length-1);
                }
                currentCommand.html(command);
                return;
        }

        if (event.keyCode == 9) {
            event.preventDefault();
            guess();
        }

        if (event.keyCode == 38) { // Up arrow
            event.preventDefault();
            dbg(commandHistoryIndex + ', ' + commandHistory.length);
            if (commandHistoryIndex > 0) {
                commandHistoryIndex--;
                currentCommand.html(commandHistory[commandHistoryIndex]);
            }
            return;
        }

        if (event.keyCode == 40) { // Down arrow
            event.preventDefault();
            dbg(commandHistoryIndex + ', ' + commandHistory.length);
            if (commandHistoryIndex < commandHistory.length) {
                commandHistoryIndex++;
                currentCommand.html(commandHistory[commandHistoryIndex]);
                // This can overflow the array by 1, which will clear the command line
            }
        }
    };

    var keypress = function(event) {
        dbg('keypress> ' + String.fromCharCode(event.keyCode) + '(' + event.keyCode + ') ' + event.ctrlKey + ' - ' + event.shiftKey + ' - ' + event.altKey + ' - ' + event.metaKey);
        if (event.ctrlKey /*|| event.shift*/ || event.altKey || event.metaKey) return;
        var command = currentCommand.html();


        if (event.keyCode == 13) {
            event.preventDefault();
            return;
        }

        if (event.keyCode == 32) {
            event.preventDefault();
            command += '&nbsp;';
            currentCommand.html(command);
            return;
        }

        // For all typing keys
        if (validkey(event.keyCode)) {
            event.preventDefault();
            if (event.keyCode == 46) {
                command += '.';
            } else {
                command += String.fromCharCode(event.keyCode);
            }
            currentCommand.html(command);
            return;
        }
    }

    var validkey = function(code) {
        return  (code > 64 && code < 91)  ||    // [A-Z]
                (code > 96 && code < 123) ||    // [a-z]
                (code == 95) || // _
                (code > 44 && code < 58);       // -./[0-9]
    };

    // Outputs a line of text
    var out = function(text) {
        var p = $('<div>');
        p.html(text);
        terminal.append(p);
    };

    // Displays the prompt for command input
    var prompt = function() {
        if (currentPrompt) { currentPrompt.find('.cursor').remove(); }

        currentPrompt = $('<div>');
        currentPrompt.append($('<span>').addClass('prompt').text('[mikgan.com]:'+current_dir.filename+'$'));
        currentCommand = $('<span>').addClass('command');
        currentPrompt.append(currentCommand);
        currentPrompt.append($('<span>').addClass('cursor'));
        terminal.append(currentPrompt);
        $().scrollTop(currentPrompt);
    };

    var guess = function() {
        var command = currentCommand.html();
//        if(command.trim().indexOf(' ') != -1 ) {alert('woot');}
//        if (command.substr(0,1) == 'c')
//            command = 'copy';
//        currentCommand.html(command);
    };

    // Executes a command
    var run = function() {
        var command = currentCommand.text();

        commandHistory.push(command);
        commandHistoryIndex = commandHistory.length;

        if (command == 'help') {
            out('List of available commands:');
            out('<span class="commandhelp">blog</span>Michael Gannon\'s blog.');
            out('<span class="commandhelp">cd</span>Change directories');
            out('<span class="commandhelp">clear</span>Clear screen.');
            out('<span class="commandhelp">contact</span>Contact info.');
            out('<span class="commandhelp">copy</span>Copyright info.');
            out('<span class="commandhelp">date</span>Displays the current date.');
            out('<span class="commandhelp">goto</span>Jump to other pages.');
            out('<span class="commandhelp">help</span>Displays this list.');
            out('<span class="commandhelp">linkedin</span>Link to LinkedIn profile.');
            out('<span class="commandhelp">ls</span>List directories.');
            out('<span class="commandhelp">projects</span>List of projects Michael is involved on.');
            out('<span class="commandhelp">skills</span>Professional skills.');
            out('<span class="commandhelp">resume</span>Displays a compact resume.');
            out('<span class="commandhelp">whois</span>Who is Michael Gannon?');
            prompt();
            return;
        }

        // ---------------------

        if (command == 'blog') {
            out('<a target="_blank" href="http://dev.mikgan.com">dev.mikgan.com</a> - Having fun with code');
            prompt();
            return;
        }

        if (command == 'clear') {
            currentPrompt = null;
            terminal.empty();
            prompt();
            return;
        }

        if (command == 'contact') {
            out('michael.gannon@gmail.com');
            prompt();
            return;
        }

        if (command == 'copy') {
            out('Copyright &copy; 2011 Michael Gannon');
            prompt();
            return;
        }

        if (command == 'date') {
            date = new Date().toString();
            out(date);
            prompt();
            return;
        }

        if (command.substr(0,2) == 'cd') {
            var dir = command.substr(3);

            if(dir == '..') {
                if(!current_dir.is_root) { current_dir = current_dir.parent; }
                prompt();
                return;
            }
            else {
                files = current_dir.files();
                for(var index = 0; index < files.length; index++) {
                    file = files[index];
                    if(file.is_dir && file.filename == dir) {
                        current_dir = file;
                        prompt();
                        return true;
                    }
                }
            }

            out('-bash: cd: '+dir+': No such file or directory');
            prompt();
            return;
        }

        if (command.substr(0,2) == 'ls') {
            out('<table>');
            $.each(current_dir.files(), function(i, file) {
                if(file.is_dir) {
                    out('<tr><td class="filesize">4096</td><td class="filedate">Jul 03 2011 07:43</td><td class="filename dir">'+file.filename+'</td></tr>');
                } else {
                    out('<tr><td class="filesize">4096</td><td class="filedate">Jul 03 2011 07:43</td><td class="filename file">'+file.filename+'</td></tr>');
                }
            });
            out('</table>');
            prompt();
            return;
        }

        if (command.substr(0,4) == 'goto') {
            var dest = command.substr(5);
            if (dest == 'blog')      { window.location.href = 'http://dev.mikgan.com'; }
            if (dest == 'linkedin')  { window.location.href = 'http://www.linkedin.com/in/mgannon'; }
            if (dest == '') { out('destination: blog, linkedin'); }
            prompt();
            return;
        }

        if (command == 'linkedin') {
            out('<a target="_blank" href="http://www.linkedin.com/in/mgannon" target="_blank">http://www.linkedin.com/in/mgannon</a>');
            prompt();
            return;
        }

        if (command == 'projects') {
//            out('<b>spaniards.es</b> - An online community for Spanish people living abroad (<a target="_blank" href="http://www.spaniards.es">www.spaniards.es</a>)');
//            out('<b>vaka-framework</b> - A Mootools based set of classes (<a target="_blank" href="http://vaca-framework.googlecode.com">vaca-framework.googlecode.com</a>)');
            prompt();
            return;
        }

        if (command == 'skills') {
            out('<b><i>Michael Gannon’s Specialties:</i></b>');
            out('Ruby, Java, Objective-C');
            out('Javascript, AJAX, jQuery');
            out('Postgres, MySQL, SqlServer and Oracle');
            prompt();
            return;
        }

        if (command == 'resume') {
//            out(' - <b><i>Senior Engineer</i></b> at LEVEL Studios since June 2008');
//            out(' - <b><i>Founder/CEO</i></b> at Spaniards.es LLC since November 2005');
//            out(' - <b><i>Lead Programmer/Analyst</i></b> at 3i Infotech from January 2005 to June 2008');
//            out(' - <b><i>Programmer/Analyst</i></b> at Fedetec from October 2002 to December 2004');
//            out(' - <b><i>Senior Programmer</i></b> at Cap Gemini Ernst &amp; Young from April 2001 to August 2002');
//            out(' - <b><i>Programmer</i></b> at Axpe Consulting &amp; Price Waterhouse Coopers from October 2000 to April 2001');
            prompt();
            return;
        }

        if (command == 'whois') {
//            out('<img src="/img/eneko.jpg"/><b>Eneko Alonso</b> is a software enginner with more than eight years of experience in web, desktop and server software:<br/><i class="bio">I am a software engineer who likes beautiful code and good design. I love debugging and digging into the code, finding out how things work. During my career I have worked on client/server environments, both Unix and Windows, developing multi threaded services and DB driven software. I have also been in contact with web development, both front and back end, learning from the latest technologies and putting them in practice in multiple projects.</i>');
            prompt();
            return;
        }

        if (command)
            out('-bash: ' + command + ': command not found');

        prompt();
    };

    return initialize(container);
};

$(document).ready(function() {
    window.terminal = new Terminal($('#terminal'));
});
