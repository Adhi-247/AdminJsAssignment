import React from 'react';
import { ApiClient, Box, Button, H1, Input, Label, Text } from 'adminjs';

const api = new ApiClient();

const Settings = () => {
  const [settings, setSettings] = React.useState([]);
  const [saving, setSaving] = React.useState(false);

  const loadSettings = async () => {
    const response = await api.getPage({ pageName: 'Settings' });
    setSettings(response.data.settings || []);
  };

  React.useEffect(() => {
    loadSettings();
  }, []);

  const handleChange = (index, value) => {
    setSettings((prev) => prev.map((item, idx) => (idx === index ? { ...item, value } : item)));
  };

  const handleSave = async () => {
    setSaving(true);
    const payload = settings.reduce((acc, item) => {
      acc[item.key] = item.value;
      return acc;
    }, {});

    await api.getPage({
      pageName: 'Settings',
      method: 'post',
      data: payload,
    });

    await loadSettings();
    setSaving(false);
  };

  return (
    <Box variant="grey" p="xxl">
      <H1>Settings</H1>

      {settings.length === 0 ? (
        <Text mt="xl">No settings found. Add records from the Settings resource first.</Text>
      ) : (
        <Box mt="xl" display="flex" flexDirection="column" gap="lg">
          {settings.map((item, index) => (
            <Box key={item.id || item.key} bg="white" p="lg" border="1px solid #d9dfe8" borderRadius="10px">
              <Label>{item.key}</Label>
              <Input value={item.value || ''} onChange={(event) => handleChange(index, event.target.value)} />
            </Box>
          ))}

          <Box>
            <Button variant="primary" onClick={handleSave} disabled={saving}>
              {saving ? 'Saving...' : 'Save Settings'}
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Settings;
