import fs from 'fs';
import yaml from 'js-yaml';

function getConfig() {
    // Get TARGET value from process.env
    const target = process.env.TARGET || 'demo'; // Defaults to 'demo' if not present
    const configPath = `data-test/config-${target}.yaml`;

    try {
        // Read YAML
        const fileContents = fs.readFileSync(configPath, 'utf8');
        return yaml.load(fileContents);

    } catch (error) {
        console.error(`❌ Error loading YAML file: ${error.message}`);
        process.exit(1); // Stop execution if YAML load fails
    }
}

module.exports = getConfig;
