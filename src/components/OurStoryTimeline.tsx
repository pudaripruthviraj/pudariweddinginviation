import React, { useState } from 'react';
import { Heart, Sparkles, Calendar, MapPin, ChevronRight } from 'lucide-react';
import { Language } from '../types/wedding';
import { LordGaneshHeader } from './LordGaneshHeader';

interface Milestone {
  id: string;
  yearEn: string;
  yearTe: string;
  dateEn: string;
  dateTe: string;
  titleEn: string;
  titleTe: string;
  locationEn: string;
  locationTe: string;
  descriptionEn: string;
  descriptionTe: string;
  imageUrl: string;
  icon: string;
}

const MILESTONES: Milestone[] = [
  {
    id: 'friendship-2020',
    yearEn: '2020',
    yearTe: '2020',
    dateEn: 'The Year 2020',
    dateTe: '2020 సంవత్సరం',
    titleEn: 'Where It All Began: A Beautiful Friendship',
    titleTe: 'మిత్రత్వంతో మొదలైన మధుర ప్రయాణం',
    locationEn: 'College & Life Paths Crossed',
    locationTe: 'పరిచయం - అనుబంధం',
    descriptionEn: 'Back in 2020, our paths crossed. What began with simple conversations, genuine smiles, and heartfelt conversations gradually laid the foundation for an unbreakable companionship.',
    descriptionTe: '2020 లో మొదలైన పరిచయం. ఒకరి ఆలోచనలు మరొకరు పంచుకుంటూ, కష్టసుఖాలలో తోడుగా నిలుస్తూ ఒక గాఢమైన స్నేహ బంధం ఏర్పడింది.',
    imageUrl: '/images/deepika_Pruthvi.jpg',
    icon: '🌸',
  },
  {
    id: 'friendship-to-love',
    yearEn: '2020 - PRESENT',
    yearTe: '2020 నుండి నేటి వరకు',
    dateEn: 'Friendship Blossoming into Love',
    dateTe: 'స్నేహం నుండి అమర ప్రేమగా',
    titleEn: 'From Best Friends to Soulmates',
    titleTe: 'మిత్రులుగా మొదలై.. ప్రేమికులుగా మారి',
    locationEn: 'Shared Dreams & Timeless Moments',
    locationTe: 'అనురాగ ప్రయాణం',
    descriptionEn: 'Over years of shared laughter, mutual trust, and unwavering understanding, our friendship organically blossomed into deep, enduring love. We knew we had found our forever partner in each other.',
    descriptionTe: 'ఏళ్ల తరబడి సాగిన స్నేహం కాలక్రమేణా పవిత్రమైన ప్రేమగా రూపాంతరం చెందింది. ఒకరికొకరం జీవితాంతం తోడునీడగా ఉండాలని నిర్ణయించుకున్న సుందర తరుణం.',
    imageUrl: '/images/telangana_wedding_rituals_1791062777431.jpg',
    icon: '💖',
  },
  {
    id: 'engagement-march-2026',
    yearEn: 'MARCH 2026',
    yearTe: 'మార్చి 2026',
    dateEn: 'March 2026',
    dateTe: 'మార్చి 2026',
    titleEn: 'Nishchithartham: The Grand Engagement',
    titleTe: 'నిశ్చితార్థ మహోత్సవం (ప్రధానం)',
    locationEn: 'Surrounded by Elders & Loved Ones',
    locationTe: 'పెద్దల ఆశీస్సులతో నిశ్చితార్థం',
    descriptionEn: 'This year in March, blessed with the heartfelt love and approval of both our beloved parents and elders, we exchanged rings and made our union official in traditional festive splendour.',
    descriptionTe: 'ఈ ఏడాది మార్చి నెలలో రెండు కుటుంబాల పెద్దలు, బంధుమిత్రుల సమక్షంలో సాంప్రదాయబద్ధంగా ఉంగరాలు మార్చుకుని నిశ్చితార్థం చేసుకున్న ఆనంద క్షణాలు.',
    imageUrl: '/images/peacock_lotus_crest_1791066368632.jpg',
    icon: '💍',
  },
  {
    id: 'wedding-oct-2026',
    yearEn: '30 OCT 2026',
    yearTe: '30 అక్టోబర్ 2026',
    dateEn: 'Friday, October 30, 2026 · 5:30 AM',
    dateTe: 'శుక్రవారం, అక్టోబర్ 30, 2026 · ఉదయం 5:30',
    titleEn: 'Subha Muhurtham: Sacred Wedding Ceremony',
    titleTe: 'శుభ ముహూర్తం - కళ్యాణ వైభవం',
    locationEn: 'Vijayadurga Kalyana Mandapam, Chittoor',
    locationTe: 'విజయదుర్గ కళ్యాణ మండపం, చిత్తూరు',
    descriptionEn: 'The sacred dawn when we tie the Mangalasutra, shower fragrant Talambralu, and take seven holy vows around the sacred fire at Chittoor.',
    descriptionTe: 'జీలకర్ర-బెల్లం, మాంగళ్యధారణ, ముత్యాల తాళంబ్రాలు మరియు సప్తపది ఏడడుగులతో ఒక్కటయ్యే పవిత్ర శుభ ముహూర్తం.',
    imageUrl: '/images/deepika_Pruthvi',
    icon: '👑',
  },
  {
    id: 'reception-nov-2026',
    yearEn: '4 NOV 2026',
    yearTe: '4 నవంబర్ 2026',
    dateEn: 'Wednesday, November 4, 2026 · Evening',
    dateTe: 'బుధవారం, నవంబర్ 4, 2026 · సాయంత్రం',
    titleEn: 'Grand Reception & Community Feast',
    titleTe: 'ఘన వివాహ రిసెప్షన్ & విందు భోజనం',
    locationEn: 'Munnuru Kapu Kalyana Mandapam, Nizamabad',
    locationTe: 'మున్నూరు కాపు కళ్యాణ మండపం, నిజామాబాద్',
    descriptionEn: 'Celebrating our new chapter with music, warm felicitations, and an authentic festive banquet welcoming all our loved ones in Nizamabad.',
    descriptionTe: 'నిజామాబాద్‌లో బంధుమిత్రుల సమక్షంలో ప్రత్యక్ష సంగీత విభావరి, విందు భోజనంతో జరుపుకునే ఘన వివాహ రిసెప్షన్.',
    imageUrl: '/images/telangana_haldi_celebration_1791062787214.jpg',
    icon: '✨',
  },
];

interface OurStoryTimelineProps {
  currentLang: Language;
}

export const OurStoryTimeline: React.FC<OurStoryTimelineProps> = ({ currentLang }) => {
  const isTelugu = currentLang === 'te';
  const [selectedId, setSelectedId] = useState<string>('friendship-2020');

  const activeMilestone = MILESTONES.find(m => m.id === selectedId) || MILESTONES[0];

  return (
    <section id="our-story" className="py-8 px-4 sm:px-6 bg-[#FFFDF9] border-b border-[#C89B3C]/40 text-center space-y-6">
      
      {/* Top Auspicious Lord Ganesh Emblem */}
      <LordGaneshHeader currentLang={currentLang} subtitle={isTelugu ? 'పరిచయం నుండి పరిణయం దాకా' : 'From Friendship to Forever'} />

      {/* Chapter Title */}
      <div className="space-y-1">
        <span className="text-xs font-bold text-[#54121E] uppercase tracking-widest font-serif">
          {isTelugu ? 'మా ప్రేమ కథ' : 'OUR SACRED JOURNEY'}
        </span>
        <h2 className="text-xl sm:text-2xl font-display font-bold text-[#54121E]">
          {isTelugu ? 'స్నేహం నుండి సాగిన ఏడడుగుల ప్రయాణం' : 'How Friendship Turned Into Love'}
        </h2>
        <p className="text-xs text-amber-950/80 max-w-md mx-auto">
          {isTelugu 
            ? '2020 లో మిత్రులుగా కలిసి, అమర ప్రేమికులుగా మారి, ఈ ఏడాది మార్చిలో నిశ్చితార్థంతో ఒక్కటైన దీపిక & పృథ్వీరాజ్ కథ' 
            : "From best friends in 2020 to forever soulmates, sealed with our March engagement and October wedding"}
        </p>
      </div>

      {/* Interactive Horizontal Milestone Navigator */}
      <div className="flex items-center justify-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 px-1 max-w-lg mx-auto">
        {MILESTONES.map((m) => {
          const isSelected = m.id === selectedId;
          return (
            <button
              key={m.id}
              onClick={() => setSelectedId(m.id)}
              className={`px-2.5 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center gap-1 shrink-0 ${
                isSelected
                  ? 'bg-[#54121E] text-white border-[#54121E] shadow-sm scale-102'
                  : 'bg-rose-50/70 border-rose-200 text-[#54121E] hover:bg-rose-100'
              }`}
            >
              <span>{m.icon}</span>
              <span className="text-[10px] sm:text-xs">{isTelugu ? m.yearTe : m.yearEn}</span>
            </button>
          );
        })}
      </div>

      {/* Active Milestone Card Presentation */}
      <div className="max-w-md mx-auto bg-white rounded-2xl border-2 border-[#C89B3C] shadow-md overflow-hidden text-left transition-all">
        {/* Visual Header */}
        <div className="relative h-44 w-full bg-amber-50 overflow-hidden">
          <img
            src={activeMilestone.imageUrl}
            alt={isTelugu ? activeMilestone.titleTe : activeMilestone.titleEn}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-3 text-white">
            <div className="flex items-center gap-1 text-[11px] font-bold text-amber-300">
              <Calendar className="w-3.5 h-3.5" />
              <span>{isTelugu ? activeMilestone.dateTe : activeMilestone.dateEn}</span>
            </div>
            <h3 className="text-base sm:text-lg font-display font-bold leading-tight">
              {isTelugu ? activeMilestone.titleTe : activeMilestone.titleEn}
            </h3>
          </div>
        </div>

        {/* Content Details */}
        <div className="p-4 space-y-2.5">
          <div className="flex items-center gap-1.5 text-xs text-[#781B10] font-semibold">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span>{isTelugu ? activeMilestone.locationTe : activeMilestone.locationEn}</span>
          </div>

          <p className="text-xs text-amber-950/90 leading-relaxed font-serif">
            {isTelugu ? activeMilestone.descriptionTe : activeMilestone.descriptionEn}
          </p>
        </div>
      </div>

    </section>
  );
};
