import Link from "next/link";
import { ArrowRight, Truck, Shield, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative bg-background py-12 sm:py-28 overflow-x-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1A5CFF08_1px,transparent_1px),linear-gradient(to_bottom,#1A5CFF08_1px,transparent_1px)] bg-[size:64px_64px]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-8">
          <div className="flex flex-col justify-center">
            <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm text-primary">
              <Truck className="h-4 w-4" />
              Skladom na Slovensku · dodanie 1-2 dní
            </div>
            <h1 className="text-balance text-3xl font-bold tracking-tight text-[#0A0A0A] sm:text-5xl lg:text-6xl">
              Oficiálny importér{" "}
              <span className="text-primary">zariadení Deye</span> na Slovensku
            </h1>
            <p className="mt-6 text-pretty text-base sm:text-lg text-[#0A0A0A]/70 pr-4 sm:pr-0">
              Hybridné a on-grid solárne meniče, batériové úložiská. B2B veľkoobchodné ceny
              bez DPH, expresné dodanie zo skladu na SK, technická podpora.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link href="/katalog">
                <Button
                  size="lg"
                  className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Zobraziť katalóg
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/podpora">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-[#0A0A0A]/20 text-[#0A0A0A] hover:bg-[#0A0A0A]/5"
                >
                  Technická podpora
                </Button>
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap gap-6 border-t border-[#0A0A0A]/10 pt-8">
              <div className="flex items-center gap-2 text-sm text-[#0A0A0A]/70">
                <Shield className="h-5 w-5 text-primary" />
                Záruka 10 rokov
              </div>
              <div className="flex items-center gap-2 text-sm text-[#0A0A0A]/70">
                <Award className="h-5 w-5 text-primary" />
                CE, TÜV, IEC certifikáty
              </div>
              <div className="flex items-center gap-2 text-sm text-[#0A0A0A]/70">
                <Truck className="h-5 w-5 text-primary" />
                Doprava po SR zdarma
              </div>
            </div>
          </div>
          <div className="relative hidden lg:flex items-center justify-center mt-8 lg:mt-0">
            <div className="w-full rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/5 to-blue-50 p-6 overflow-hidden" style={{minHeight:'420px'}}>
              <div dangerouslySetInnerHTML={{__html: `
                <style>
                  .hw{font-family:sans-serif;position:relative;width:100%;height:400px;overflow:hidden}
                  .sun-w{position:absolute;top:20px;right:30px;width:56px;height:56px}
                  .sun-c{width:56px;height:56px;background:#FFD700;border-radius:50%;animation:sp 3s ease-in-out infinite;box-shadow:0 0 20px rgba(255,215,0,0.4)}
                  @keyframes sp{0%,100%{box-shadow:0 0 20px 4px rgba(255,215,0,0.3)}50%{box-shadow:0 0 40px 14px rgba(255,215,0,0.5)}}
                  .ray{position:absolute;background:rgba(255,215,0,0.6);border-radius:2px;transform-origin:28px 28px;animation:rr 8s linear infinite}
                  .r1{width:4px;height:18px;top:-12px;left:26px}
                  .r2{width:4px;height:18px;top:50px;left:26px}
                  .r3{width:18px;height:4px;top:26px;left:-12px}
                  .r4{width:18px;height:4px;top:26px;left:50px}
                  .r5{width:12px;height:3px;top:6px;left:6px;transform:rotate(45deg) translate(8px,-16px)}
                  .r6{width:12px;height:3px;top:6px;left:36px;transform:rotate(-45deg) translate(-8px,-16px)}
                  @keyframes rr{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
                  .sys{display:flex;align-items:center;justify-content:center;gap:0;margin-top:80px}
                  .pnls{display:flex;flex-direction:column;gap:5px}
                  .pnl{width:65px;height:42px;background:#1A3A6C;border-radius:4px;border:1px solid #2A5FAA;position:relative;overflow:hidden}
                  .pnl::before{content:'';position:absolute;inset:0;background:repeating-linear-gradient(90deg,transparent,transparent 20px,rgba(42,95,170,0.5) 20px,rgba(42,95,170,0.5) 21px)}
                  .pnl::after{content:'';position:absolute;inset:0;background:repeating-linear-gradient(0deg,transparent,transparent 13px,rgba(42,95,170,0.5) 13px,rgba(42,95,170,0.5) 14px)}
                  .ps{position:absolute;inset:0;background:linear-gradient(135deg,rgba(255,255,255,0.15) 0%,transparent 60%);animation:pp 2s ease-in-out infinite alternate}
                  @keyframes pp{from{opacity:0.5}to{opacity:1}}
                  .wr{width:45px;height:3px;position:relative;display:flex;align-items:center}
                  .wpv{background:linear-gradient(90deg,#FF9900,#FFB800)}
                  .wb{background:linear-gradient(90deg,#1A5CFF,#4A7CFF)}
                  .wg{background:#999}
                  .dt{width:7px;height:7px;border-radius:50%;position:absolute;animation:fl 1.5s linear infinite}
                  .dpv{background:#FFD700;box-shadow:0 0 5px #FFD700}
                  .db{background:#00FF88;box-shadow:0 0 5px #00FF88}
                  .dg{background:#bbb}
                  @keyframes fl{0%{left:0;opacity:0}20%{opacity:1}80%{opacity:1}100%{left:calc(100% - 7px);opacity:0}}
                  .d2{animation-delay:0.5s}.d3{animation-delay:1s}
                  .inv{width:120px;background:white;border-radius:10px;border:2px solid #1A5CFF;overflow:hidden;box-shadow:0 4px 18px rgba(26,92,255,0.15)}
                  .ih{background:#1A5CFF;padding:7px;text-align:center;color:white;font-size:10px;font-weight:700;letter-spacing:0.5px}
                  .isc{background:#0A1628;margin:8px;border-radius:5px;padding:8px;text-align:center}
                  .il{color:#4A7CFF;font-size:8px;letter-spacing:1px}
                  .ip{color:#00FF88;font-size:18px;font-weight:700;font-family:monospace}
                  .iv{color:#666;font-size:8px;margin-top:2px}
                  .leds{display:flex;gap:5px;justify-content:center;padding:7px}
                  .led{width:7px;height:7px;border-radius:50%}
                  .lg2{background:#00CC44;animation:blg 1s ease-in-out infinite alternate}
                  .lb{background:#1A5CFF;animation:blb 1.5s ease-in-out infinite alternate}
                  .lo{background:#FF9900;animation:blo 2s ease-in-out infinite alternate}
                  @keyframes blg{from{opacity:0.4}to{opacity:1;box-shadow:0 0 5px #00CC44}}
                  @keyframes blb{from{opacity:0.4}to{opacity:1;box-shadow:0 0 5px #1A5CFF}}
                  @keyframes blo{from{opacity:0.4}to{opacity:1;box-shadow:0 0 5px #FF9900}}
                  .im{text-align:center;font-size:9px;font-weight:700;color:#1A5CFF;padding:3px}
                  .bat{width:100px;background:white;border-radius:10px;border:2px solid #1A5CFF;overflow:hidden;box-shadow:0 4px 18px rgba(26,92,255,0.15)}
                  .bh{background:#0A1628;padding:7px;text-align:center;color:white;font-size:9px;font-weight:700}
                  .blw{margin:8px;border:1px solid #E0E8FF;border-radius:5px;overflow:hidden;background:#F8F9FF}
                  .bl{height:11px;background:linear-gradient(90deg,#1A5CFF,#4A7CFF);animation:ch 4s ease-in-out infinite}
                  @keyframes ch{0%{width:60%}50%{width:85%}100%{width:60%}}
                  .bb{margin:3px 8px;height:7px;border-radius:2px;background:#E0E8FF;overflow:hidden}
                  .bb::after{content:'';display:block;height:100%;background:#1A5CFF}
                  .bb1::after{width:90%}.bb2::after{width:75%}.bb3::after{width:60%}
                  .bp{text-align:center;font-size:13px;font-weight:700;color:#1A5CFF;padding:5px 0 2px}
                  .bk{text-align:center;font-size:8px;color:#888;padding-bottom:5px}
                  .bc{text-align:center;font-size:8px;font-weight:700;color:#0A1628;padding:3px;border-top:1px solid #eee}
                  .hbox{width:55px;text-align:center}
                  .hico{width:44px;height:44px;margin:0 auto;background:white;border-radius:6px;border:1px solid #ddd;display:flex;align-items:center;justify-content:center}
                  .hlbl{font-size:9px;color:#666;margin-top:3px}
                  .brow{display:flex;gap:6px;justify-content:center;margin-top:16px;flex-wrap:wrap}
                  .bdg{background:#EEF4FF;border:1px solid #C0D4FF;border-radius:100px;padding:3px 10px;font-size:9px;color:#1A5CFF;font-weight:600}
                  .plbl{font-size:9px;color:#666;text-align:center;margin-top:3px}
                </style>
                <div class="hw">
                  <div class="sun-w">
                    <div style="position:relative;width:56px;height:56px">
                      <div class="ray r1"></div><div class="ray r2"></div><div class="ray r3"></div><div class="ray r4"></div><div class="ray r5"></div><div class="ray r6"></div>
                      <div class="sun-c"></div>
                    </div>
                  </div>
                  <div class="sys">
                    <div class="pnls">
                      <div class="pnl"><div class="ps"></div></div>
                      <div class="pnl"><div class="ps"></div></div>
                      <div class="plbl">FV panely</div>
                    </div>
                    <div class="wr wpv"><div class="dt dpv"></div><div class="dt dpv d2"></div></div>
                    <div class="inv">
                      <div class="ih">DEYE HYBRID</div>
                      <div class="isc">
                        <div class="il">OUTPUT</div>
                        <div class="ip">3.6 kW</div>
                        <div class="iv">230V · 3-fáz</div>
                      </div>
                      <div class="leds"><div class="led lg2"></div><div class="led lb"></div><div class="led lo"></div></div>
                      <div class="im">SUN-20K</div>
                    </div>
                    <div class="wr wb"><div class="dt db"></div><div class="dt db d2"></div></div>
                    <div class="bat">
                      <div class="bh">SE-G5.1 Pro-B</div>
                      <div class="blw"><div class="bl"></div></div>
                      <div class="bb bb1"></div><div class="bb bb2"></div><div class="bb bb3"></div>
                      <div class="bp">75%</div>
                      <div class="bk">5.1 kWh · LiFePO4</div>
                      <div class="bc">Nabíja sa</div>
                    </div>
                    <div class="wr wg"><div class="dt dg"></div></div>
                    <div class="hbox">
                      <div class="hico">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1A5CFF" stroke-width="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg>
                      </div>
                      <div class="hlbl">Domácnosť</div>
                    </div>
                  </div>
                  <div class="brow">
                    <div class="bdg">10 rokov záruka</div>
                    <div class="bdg">Skladom na SK</div>
                    <div class="bdg">1-2 dni dodanie</div>
                  </div>
                </div>
              `}} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
