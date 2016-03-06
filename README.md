# smartclone


smart-clone allows you to clone a repository using a consistent directory structure, similar to the way golang manages dependencies. The tool is able to take multiple formats of the repos URL.

This tool came out of the frustration of having git repos haphazardly cloned across my file system. This often led to time wasted trying to find repositories and repos being unnessarily recloned when the repo already existed on the computer. This concept is largely inspired by the way Golang manages source code.

```
smartclone [-c] URL [BaseDir]

If BaseDir is not set the current working directory is used.

-d prints local repo location
-b base directory to use
```

### Alias

This bash function may be helpful, **REPOS** should be set to you central repo location:
```bash
clone() {cd $(smart-clone -d -b $REPOS $@)}
```
