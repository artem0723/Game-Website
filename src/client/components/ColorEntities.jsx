import React from 'react';

const COLOR_ENTITY_REGEX = /\^[0-9\^]/g;
const COLOR_ENTITY_MAP = {
  '^0': 'rgba(255, 255, 255, 0.5)', // black
  '^1': '#f00',
  '^2': '#0f0',
  '^3': '#ff0',
  '^4': '#00f',
  '^5': '#0ff',
  '^6': '#f0f',
  '^7': '#fff',
  '^8': '#f80',
  '^9': 'rgba(255, 255, 255, 0.6)',
};

export default function ColorEntities(props) {
  const strings = props.value.split(COLOR_ENTITY_REGEX);
  const entities = props.value.match(COLOR_ENTITY_REGEX);
  return strings
    // Zip entities and strings together
    .reduce((pairs, str, i) => {
      // Get entity
      const entity = entities && entities[i - 1];
      // Handle escape sequence
      if (entity === '^^') {
        str = '^' + str;
      };
      // Skip empty strings
      if (!str) {
        return pairs;
      }
      // Add next pair
      pairs.push([entity, str]);
      return pairs;
    }, [])
    // Map pairs to elements
    .map(([entity, str], i) => {
      if (!entity) {
        return str;
      }
      const color = COLOR_ENTITY_MAP[entity];
      return (
        <span key={i} style={{ color }}>{str}</span>
      );
    });
}
