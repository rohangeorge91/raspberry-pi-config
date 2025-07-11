1. Do an `sudo apt update` and `sudo apt upgrade` to get the node updated
2. Setup bash_profile and bashrc (hopefully already present)

bash_profile
```sh
   # Get the aliases and functions
if [ -f ~/.bashrc ]; then
  . ~/.bashrc
fi

# User specific environment and startup programs

parse_git_branch() {
  git branch 2> /dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/ (\1)/'
}

export PS1="\[$(tput bold)\]\[\033[38;5;13m\]\u\[$(tput sgr0)\]\[$(tput sgr0)\]\[\033[38;5;8m\]@\[$(tput bold)\]\[$(tput sgr0)\]\[\033[38;5;10m\]\h\[$(tput sgr0)\]\[$(tput sgr0)\]\[\033[38;5;15m\]:\[$(tput sgr0)\]\[\033[38;5;12m\]\w\[$(tput sgr0)\]\[\033[38;5;2m\]\$(parse_git_branch)\[$(tput sgr0)\]\[\033[38;5;15m\] \\$ \[$(tput sgr0)\]"
```
3. Name the hostname based on user@device-{cluster-no}
   ```sh
   # where rasp-pi5 is the model and c1 is the cluter number
   echo "rasp-pi5-c1" | sudo tee /etc/hostname
   ```
4. Install git if not present. Clone this repo and any other required.
5. Install Microk8s and kubectl 
