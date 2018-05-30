var exec = require('child_process').exec;
var Table = require('cli-table');

class Command
{   
    filter(error, stdout, stderr)
    {
        var table = new Table({
            head: ['hash', 'author_name', 'time_relative', 'committer_date'],
            colWidths: [31, 35, 60, 35],
            style: {
                'head' : 'yellow'
            }
        });
        
        var json = [];
        var commits = stdout.split(/\r?\n/);
        commits.forEach(function(commit){
            var commit = commit.split('|');
            var arrayCommit = {
                'hash': commit[0],
                'author_name': commit[1],
                'time_relative': commit[2],
                'committer_date': commit[3],
            };
            json.push(arrayCommit);
        });
        
        var stdout = json;
        
        stdout.forEach(function(commit){
            var arrayCommit = [commit.hash, commit.author_name, commit.time_relative, commit.committer_date]
            table.push(arrayCommit);
        });
        console.log(table.toString());
    }
    
    get run()
    {
        exec('git log --pretty=format:"%h|%an|%ar|%cd"', this.filter);
    }
}

module.exports = new Command();