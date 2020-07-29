
#!/usr/bin/env python3
import ruamel.yaml
import os

# file paths
input_file = "config/50-cloud-init.t.yaml"
output_file = "config/50-cloud-init.yaml"

yaml = ruamel.yaml.YAML()
config, ind, bsi = ruamel.yaml.util.load_yaml_guess_indent(open(input_file))
wlan0 = config['network']['wifis']['wlan0']

accesspointusername = os.environ.get('accesspointusername')
accesspointpassword = os.environ.get('accesspointpassword')

data = {}
data[accesspointusername] = {
	"password": accesspointpassword
}
wlan0['access-points'] = data

with open(output_file, 'w+') as fp:
	yaml.dump(config, fp)

