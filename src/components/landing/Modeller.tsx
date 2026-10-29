"use client";

import { useMemo, useState } from "react";
import { runModel, type ModelInputs } from "../../lib/finance";
import Reveal from "../ui/Reveal";
import SectionHead from "../ui/SectionHead";
import ModellerControls from "./ModellerControls";
import ModellerResults from "./ModellerResults";

const initial: ModelInputs = {
  propertyValue: 1400000,
  years: 7,
  grossYield: 6.4,
  appreciation: 5.5,
  occupancy: 92,
};

export default function Modeller() {
  const [inputs, setInputs] = useState<ModelInputs>(initial);
  const outputs = useMemo(() => runModel(inputs), [inputs]);

  return (
    <section id="modeller" className="w-full bg-[#F5F2EA] py-28 md:py-40">
      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-14">
        <Reveal>
          <SectionHead
            eyebrow="Investment modeller"
            title="Know what the investment could become."
            description="Adjust the available price, holding period, rental yield and appreciation assumptions and see the model recalculate instantly."
          />
        </Reveal>

        <Reveal className="mt-16">
          <div className="grid gap-px bg-[#080B0F]/10 lg:grid-cols-[minmax(320px,0.8fr)_1.6fr]">
            <div className="bg-white p-8 md:p-11">
              <ModellerControls
                inputs={inputs}
                onChange={(patch) => setInputs((s) => ({ ...s, ...patch }))}
              />
            </div>
            <div className="bg-[#FBFAF6] p-6 md:p-8">
              <ModellerResults inputs={inputs} outputs={outputs} />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
