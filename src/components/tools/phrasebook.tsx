"use client";

import { useMemo, useState } from "react";
import { Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";

/* Frázy SK → vietnamčina + zjednodušená fonetická výslovnosť pre Slováka.
   Prehrávanie cez Web Speech API (hlas vi-VN, ak ho systém má). */
type Phrase = { cat: string; sk: string; vn: string; say: string };

const PHRASES: Phrase[] = [
  // Základy
  { cat: "Základy", sk: "Dobrý deň / Ahoj", vn: "Xin chào", say: "sin čao" },
  { cat: "Základy", sk: "Dovidenia", vn: "Tạm biệt", say: "tam biet" },
  { cat: "Základy", sk: "Ďakujem", vn: "Cảm ơn", say: "kám on" },
  { cat: "Základy", sk: "Ďakujem veľmi pekne", vn: "Cảm ơn rất nhiều", say: "kám on rat ňieu" },
  { cat: "Základy", sk: "Prosím / Nie je za čo", vn: "Không có gì", say: "khong kó zi" },
  { cat: "Základy", sk: "Áno", vn: "Vâng / Có", say: "vang / kó" },
  { cat: "Základy", sk: "Nie", vn: "Không", say: "khong" },
  { cat: "Základy", sk: "Prepáčte", vn: "Xin lỗi", say: "sin loi" },
  { cat: "Základy", sk: "Nevadí / V poriadku", vn: "Không sao", say: "khong sao" },
  { cat: "Základy", sk: "Nerozumiem", vn: "Tôi không hiểu", say: "toi khong hjeu" },
  { cat: "Základy", sk: "Rozumiete po anglicky?", vn: "Bạn nói tiếng Anh không?", say: "ban noi tieng aň khong" },
  { cat: "Základy", sk: "Zopakujte to, prosím", vn: "Nhắc lại được không?", say: "ňak laj duok khong" },
  { cat: "Základy", sk: "Hovorte pomaly, prosím", vn: "Nói chậm thôi", say: "noi čam thoi" },
  { cat: "Základy", sk: "Ako sa to povie?", vn: "Cái này gọi là gì?", say: "kai naj goi la zi" },

  // Zoznámenie
  { cat: "Zoznámenie", sk: "Ako sa máš?", vn: "Bạn khỏe không?", say: "ban khwe khong" },
  { cat: "Zoznámenie", sk: "Mám sa dobre", vn: "Tôi khỏe", say: "toi khwe" },
  { cat: "Zoznámenie", sk: "Ako sa voláš?", vn: "Bạn tên gì?", say: "ban ten zi" },
  { cat: "Zoznámenie", sk: "Volám sa...", vn: "Tôi tên là...", say: "toi ten la..." },
  { cat: "Zoznámenie", sk: "Som zo Slovenska", vn: "Tôi đến từ Slovakia", say: "toi den tu slovakia" },
  { cat: "Zoznámenie", sk: "Teší ma", vn: "Rất vui được gặp bạn", say: "rat vui duok gap ban" },

  // Jedlo & pitie
  { cat: "Jedlo & pitie", sk: "Menu, prosím", vn: "Cho tôi thực đơn", say: "čo toi thuk don" },
  { cat: "Jedlo & pitie", sk: "Chcem si objednať", vn: "Tôi muốn gọi món", say: "toi muon goi mon" },
  { cat: "Jedlo & pitie", sk: "Som vegetarián", vn: "Tôi ăn chay", say: "toi an čaj" },
  { cat: "Jedlo & pitie", sk: "Bez mäsa", vn: "Không thịt", say: "khong thit" },
  { cat: "Jedlo & pitie", sk: "Nie pálivé, prosím", vn: "Không cay", say: "khong kaj" },
  { cat: "Jedlo & pitie", sk: "Trochu pálivé", vn: "Cay một chút", say: "kaj mot čut" },
  { cat: "Jedlo & pitie", sk: "Som alergický na...", vn: "Tôi bị dị ứng với...", say: "toi bi zi ung voi..." },
  { cat: "Jedlo & pitie", sk: "Je to veľmi dobré", vn: "Rất ngon", say: "rat ngon" },
  { cat: "Jedlo & pitie", sk: "Voda", vn: "Nước", say: "nuok" },
  { cat: "Jedlo & pitie", sk: "Balená voda", vn: "Nước suối", say: "nuok suoi" },
  { cat: "Jedlo & pitie", sk: "Káva (s mliekom)", vn: "Cà phê sữa", say: "ka fe sua" },
  { cat: "Jedlo & pitie", sk: "Pivo", vn: "Bia", say: "bia" },
  { cat: "Jedlo & pitie", sk: "Bez ľadu", vn: "Không đá", say: "khong da" },
  { cat: "Jedlo & pitie", sk: "Účet, prosím", vn: "Tính tiền", say: "tinh tien" },
  { cat: "Jedlo & pitie", sk: "Na zdravie!", vn: "Một hai ba, dô!", say: "mot haj ba, zo" },

  // Ubytovanie
  { cat: "Ubytovanie", sk: "Máte voľnú izbu?", vn: "Còn phòng không?", say: "kon fong khong" },
  { cat: "Ubytovanie", sk: "Koľko za noc?", vn: "Bao nhiêu một đêm?", say: "bao ňieu mot dem" },
  { cat: "Ubytovanie", sk: "Sú v cene raňajky?", vn: "Có bao gồm ăn sáng không?", say: "kó bao gom an sang khong" },
  { cat: "Ubytovanie", sk: "Funguje tu wifi?", vn: "Có wifi không?", say: "kó wifi khong" },
  { cat: "Ubytovanie", sk: "Klimatizácia", vn: "Máy lạnh", say: "maj laň" },
  { cat: "Ubytovanie", sk: "Kľúč, prosím", vn: "Cho tôi chìa khóa", say: "čo toi čia khwa" },

  // Doprava
  { cat: "Doprava", sk: "Kde je...?", vn: "... ở đâu?", say: "... o dau" },
  { cat: "Doprava", sk: "Letisko", vn: "Sân bay", say: "san baj" },
  { cat: "Doprava", sk: "Vlaková stanica", vn: "Ga tàu", say: "ga tau" },
  { cat: "Doprava", sk: "Autobusová stanica", vn: "Bến xe", say: "ben se" },
  { cat: "Doprava", sk: "Chcem ísť do...", vn: "Tôi muốn đi...", say: "toi muon di..." },
  { cat: "Doprava", sk: "Zastavte tu, prosím", vn: "Dừng ở đây", say: "zung o dej" },
  { cat: "Doprava", sk: "Zapnite taxameter, prosím", vn: "Bật đồng hồ", say: "bat dong ho" },
  { cat: "Doprava", sk: "Ako ďaleko je to?", vn: "Bao xa?", say: "bao sa" },
  { cat: "Doprava", sk: "Doľava / Doprava", vn: "Rẽ trái / Rẽ phải", say: "re čai / re faj" },
  { cat: "Doprava", sk: "Rovno", vn: "Đi thẳng", say: "di thang" },

  // Nakupovanie
  { cat: "Nakupovanie", sk: "Koľko to stojí?", vn: "Bao nhiêu tiền?", say: "bao ňieu tien" },
  { cat: "Nakupovanie", sk: "Je to príliš drahé", vn: "Đắt quá", say: "dat kwá" },
  { cat: "Nakupovanie", sk: "Zľavu, prosím", vn: "Giảm giá đi", say: "zám zá di" },
  { cat: "Nakupovanie", sk: "Dáte lacnejšie?", vn: "Bớt được không?", say: "bot duok khong" },
  { cat: "Nakupovanie", sk: "Len sa pozerám", vn: "Tôi chỉ xem thôi", say: "toi či sem thoi" },
  { cat: "Nakupovanie", sk: "Zoberiem to", vn: "Tôi lấy cái này", say: "toi laj kai naj" },
  { cat: "Nakupovanie", sk: "Platím kartou?", vn: "Trả thẻ được không?", say: "ča the duok khong" },

  // Čísla
  { cat: "Čísla", sk: "Jeden", vn: "Một", say: "mot" },
  { cat: "Čísla", sk: "Dva", vn: "Hai", say: "haj" },
  { cat: "Čísla", sk: "Tri", vn: "Ba", say: "ba" },
  { cat: "Čísla", sk: "Štyri", vn: "Bốn", say: "bon" },
  { cat: "Čísla", sk: "Päť", vn: "Năm", say: "nam" },
  { cat: "Čísla", sk: "Desať", vn: "Mười", say: "muoi" },
  { cat: "Čísla", sk: "Sto", vn: "Một trăm", say: "mot čam" },
  { cat: "Čísla", sk: "Tisíc", vn: "Một nghìn", say: "mot ngin" },

  // Čas & orientácia
  { cat: "Čas & orientácia", sk: "Koľko je hodín?", vn: "Mấy giờ rồi?", say: "maj zo roi" },
  { cat: "Čas & orientácia", sk: "Dnes / Zajtra", vn: "Hôm nay / Ngày mai", say: "hom naj / ngaj maj" },
  { cat: "Čas & orientácia", sk: "Kedy?", vn: "Khi nào?", say: "khi nao" },
  { cat: "Čas & orientácia", sk: "Otvorené / Zatvorené", vn: "Mở cửa / Đóng cửa", say: "mo kua / dong kua" },
  { cat: "Čas & orientácia", sk: "Kde je toaleta?", vn: "Nhà vệ sinh ở đâu?", say: "ňa ve sinh o dau" },

  // Núdza & zdravie
  { cat: "Núdza & zdravie", sk: "Pomoc!", vn: "Cứu tôi!", say: "kuu toi" },
  { cat: "Núdza & zdravie", sk: "Potrebujem lekára", vn: "Tôi cần bác sĩ", say: "toi kan bak sí" },
  { cat: "Núdza & zdravie", sk: "Nemocnica", vn: "Bệnh viện", say: "beň vien" },
  { cat: "Núdza & zdravie", sk: "Lekáreň", vn: "Nhà thuốc", say: "ňa thuok" },
  { cat: "Núdza & zdravie", sk: "Je mi zle", vn: "Tôi bị ốm", say: "toi bi om" },
  { cat: "Núdza & zdravie", sk: "Bolí ma tu", vn: "Tôi đau ở đây", say: "toi dau o dej" },
  { cat: "Núdza & zdravie", sk: "Zavolajte políciu", vn: "Gọi công an", say: "goi kong an" },
  { cat: "Núdza & zdravie", sk: "Stratil som sa", vn: "Tôi bị lạc", say: "toi bi lak" },
];

const CATS = ["Všetko", ...Array.from(new Set(PHRASES.map((p) => p.cat)))];

function speak(vn: string) {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(vn);
  u.lang = "vi-VN";
  u.rate = 0.85;
  const voices = window.speechSynthesis.getVoices();
  const vi = voices.find((v) => v.lang?.toLowerCase().startsWith("vi"));
  if (vi) u.voice = vi;
  window.speechSynthesis.speak(u);
}

export function Phrasebook() {
  const [cat, setCat] = useState("Všetko");
  const [q, setQ] = useState("");

  const list = useMemo(() => {
    const query = q.trim().toLowerCase();
    return PHRASES.filter(
      (p) =>
        (cat === "Všetko" || p.cat === cat) &&
        (!query ||
          p.sk.toLowerCase().includes(query) ||
          p.vn.toLowerCase().includes(query) ||
          p.say.toLowerCase().includes(query))
    );
  }, [cat, q]);

  return (
    <div className="rounded-lg border border-border bg-surface p-6 shadow-soft md:p-8">
      <div className="flex flex-wrap items-center gap-2">
        {CATS.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCat(c)}
            className={cn(
              "rounded-sm border px-3 py-1.5 text-[13px] font-medium transition-colors duration-150",
              cat === c
                ? "border-jade bg-jade text-white"
                : "border-border bg-surface text-muted-foreground hover:border-jade"
            )}
          >
            {c}
          </button>
        ))}
      </div>

      <input
        placeholder="Hľadaj frázu…"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        className="mt-4 h-11 w-full rounded-sm border border-border bg-surface px-3.5 text-sm outline-none transition-colors duration-150 focus:border-jade"
      />

      <ul className="mt-5 divide-y divide-border">
        {list.map((p) => (
          <li key={p.sk} className="flex items-center justify-between gap-4 py-4">
            <div className="min-w-0">
              <p className="text-sm leading-relaxed text-muted-foreground">{p.sk}</p>
              <p className="mt-1 text-[17px] font-semibold leading-relaxed">
                {p.vn}
              </p>
              <p className="data-num mt-1 text-[13px] leading-relaxed text-jade">
                [{p.say}]
              </p>
            </div>
            <button
              type="button"
              onClick={() => speak(p.vn)}
              aria-label={`Prehrať výslovnosť: ${p.vn}`}
              title="Prehrať výslovnosť"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-border text-jade transition-colors duration-150 hover:border-jade hover:bg-primary-light"
            >
              <Volume2 size={18} />
            </button>
          </li>
        ))}
        {list.length === 0 && (
          <li className="py-8 text-center text-sm text-muted-foreground">
            Nič sa nenašlo — skús iné slovo.
          </li>
        )}
      </ul>

      <p className="mt-5 border-t border-border pt-4 text-[13px] leading-relaxed text-muted-foreground">
        Tlačidlo 🔊 prehrá vietnamskú výslovnosť (potrebuje vietnamský hlas v
        systéme — na iPhone/Macu funguje, na Windows/Androide nemusí byť
        nainštalovaný). Vietnamčina je tónový jazyk, výslovnosť v zátvorke je
        zjednodušená — aj so snahou ti domáci radi pomôžu.
      </p>
    </div>
  );
}
