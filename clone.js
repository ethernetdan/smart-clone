#!/usr/bin/env node

var path = require('path')

var GitParse = require('git-url-parse');
var cli = require('cli').enable('status');
var Gitty = require('gitty');

const gitAlreadyExists = 'already exists and is not an empty directory'

function repoDir(base, info) {
    return path.join(base, info.resource, info.owner, info.name)
}

cli.parse({
    printDir: ['d', 'Print destination dir to stdout, useful for scripting'],
    base: ['b', 'Base directory to use, default is working dir', 'directory', process.cwd()],
    protocol: ['p', 'Protocol to use in cloning (ssh/https)', 'string', 'ssh']
});

cli.main(function(args, options) {
    if (args.length == 0) {
        cli.fatal('A repository reference must be given')
    }

    info = GitParse(args[0])

    // get destination directory
    dst = repoDir(options.base, info)

    // clone repository
    url = info.toString(options.protocol)
    cli.info('Cloning "' + url + '" to "' + dst + '"...')
    Gitty.clone(dst, url, function(err) {
        if (err) {
            // ignore already existing if changing dirs
            if (err.message.indexOf(gitAlreadyExists) == -1 && !options.printDir) {
                cli.fatal('Could not clone: ' + err)
            }
        }

        if (options.printDir) {
            console.log(dst)
        }
    });
});
