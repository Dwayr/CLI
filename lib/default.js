var exec = require('child_process').exec;
var Table = require('cli-table');

class Command
{    
    filter(error, stdout, stderr)
    {
        var table = new Table({
            head: ['Hash', 'Author', 'Message', 'Date'],
            colWidths: [42, 25, 60, 35]
        });
        
        var log = stdout.split(/\r?\n/);
        var json = [];
        var commitInfo = {};
        for(var i in log){
            var str = log[i];
            if(str.match(/^commit\s+/)){
                var split = str.split(/^commit\s+/);
                commitInfo['commit'] = split[1];
            }
            if(str.match(/^Author:\s+/)){
                var split = str.split(/^Author:\s+/);
                commitInfo['Author'] = split[1].split(' <')[0];
            }
            if(str.match(/^Date:\s+/)){
                var split = str.split(/^Date:\s+/);
                commitInfo['Date'] = split[1];
            }
            if(str.match(/^\s+/)){
                var split = str.split(/^\s+/);
                commitInfo['message'] = split[1];
            }
            else if(commitInfo['commit'] != undefined && commitInfo['Author'] != undefined && commitInfo['Date'] != undefined && commitInfo['message'] != undefined){
                json.push(commitInfo);
                commitInfo = {};
            }
        }
        
        var stdout = json;
        
        console.log('commits', stdout.length); // git log --oneline | wc -l
        stdout.forEach(function(commit){
            var arrayCommit = [commit.commit, commit.Author, commit.message, commit.Date]
            table.push(arrayCommit);
        });
        console.log(table.toString());
    }
    
    get run()
    {
        exec('git log', this.filter);
    }
}

module.exports = new Command();