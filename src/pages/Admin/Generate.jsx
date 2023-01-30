import React from "react";
import { useTranslation } from "react-i18next";
import { Tabs } from "flowbite-react";
import RandomGenerate from "../../components/RandomGenerate";
import CustomGenerate from "../../components/CustomGenerate";

const Generate = () => {
  return (
    <div>
      <Tabs.Group style="pills" className="gap-4">
        <Tabs.Item active={true} title="Random">
          <RandomGenerate />
        </Tabs.Item>
        <Tabs.Item title="Custom">
          <CustomGenerate />
        </Tabs.Item>
      </Tabs.Group>
    </div>
  );
};

export default Generate;
