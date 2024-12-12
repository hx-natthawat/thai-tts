'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, Square, Settings2, RefreshCw } from 'lucide-react';

const TYPING_DELAY = 3000; // 3 seconds

const EXAMPLE_TEXTS = {
  th: `สวัสดีค่ะ ยินดีต้อนรับสู่โปรแกรมแปลงข้อความเป็นเสียงพูด

คุณสามารถพิมพ์ข้อความภาษาไทยที่ต้องการให้อ่านได้ที่นี่ และปรับแต่งเสียงได้ตามต้องการ
- ปรับความเร็วในการพูด
- ปรับระดับเสียงสูง-ต่ำ
- ปรับความดังของเสียง

ลองพิมพ์ข้อความของคุณเองดูสิคะ!`,
  en: `Hello! Welcome to the Text-to-Speech program.

You can type any text you want to be read aloud here and customize the voice settings:
- Adjust speaking speed
- Change voice pitch
- Control volume level

Try typing your own text!`
};

export default function Home() {
  const [text, setText] = useState(EXAMPLE_TEXTS.th);
  const [isTyping, setIsTyping] = useState(false);
  const [language, setLanguage] = useState('th');
  const [settings, setSettings] = useState({
    pitch: 1,
    rate: 1,
    volume: 1,
  });
  const [autoSpeak, setAutoSpeak] = useState(true);
  const [speaking, setSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const typingTimer = useRef<NodeJS.Timeout>();
  const speechSynth = typeof window !== 'undefined' ? window.speechSynthesis : null;

  const speak = useCallback(() => {
    if (!speechSynth || !text) return;

    // Stop any ongoing speech
    speechSynth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language === 'th' ? 'th-TH' : 'en-US';
    utterance.pitch = settings.pitch;
    utterance.rate = settings.rate;
    utterance.volume = settings.volume;

    utterance.onstart = () => {
      setSpeaking(true);
      setIsPaused(false);
    };

    utterance.onend = () => {
      setSpeaking(false);
      setIsPaused(false);
    };

    speechSynth.speak(utterance);
  }, [text, language, settings, speechSynth]);

  const updateCurrentUtterance = useCallback(() => {
    if (speechSynth && speechSynth.speaking) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'th' ? 'th-TH' : 'en-US';
      utterance.pitch = settings.pitch;
      utterance.rate = settings.rate;
      utterance.volume = settings.volume;
      
      speechSynth.cancel();
      speechSynth.speak(utterance);
      setSpeaking(true);
      setIsPaused(false);
    }
  }, [text, language, settings, speechSynth]);

  useEffect(() => {
    updateCurrentUtterance();
  }, [settings, updateCurrentUtterance]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    setIsTyping(true);

    if (typingTimer.current) {
      clearTimeout(typingTimer.current);
    }

    typingTimer.current = setTimeout(() => {
      setIsTyping(false);
      if (autoSpeak && e.target.value) {
        speak();
      }
    }, TYPING_DELAY);
  };

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    setText(EXAMPLE_TEXTS[newLanguage as keyof typeof EXAMPLE_TEXTS]);
  };

  const handlePause = () => {
    if (speechSynth) {
      speechSynth.pause();
      setIsPaused(true);
    }
  };

  const handleResume = () => {
    if (speechSynth) {
      speechSynth.resume();
      setIsPaused(false);
    }
  };

  const handleStop = () => {
    if (speechSynth) {
      speechSynth.cancel();
      setSpeaking(false);
      setIsPaused(false);
    }
  };

  const handleSettingChange = (key: keyof typeof settings, value: number) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    return () => {
      if (typingTimer.current) {
        clearTimeout(typingTimer.current);
      }
      if (speechSynth) {
        speechSynth.cancel();
      }
    };
  }, []);

  return (
    <main className="gradient-bg min-h-screen p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-4xl"
      >
        <div className="glassmorphism rounded-xl p-6 space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="gradient-text neon-glow text-3xl md:text-4xl font-bold">
              {language === 'th' ? 'แปลงข้อความเป็นเสียงพูด' : 'Text to Speech'}
            </h1>
            <p className="text-gray-400">
              {language === 'th' 
                ? 'พิมพ์ข้อความที่ต้องการให้อ่านด้านล่าง' 
                : 'Enter the text you want to be spoken below'}
            </p>
          </div>

          {/* Controls */}
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            <Select value={language} onValueChange={handleLanguageChange}>
              <SelectTrigger className="w-[180px] bg-black/20 border-purple-500/20">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent className="bg-black/90 border-purple-500/20">
                <SelectItem value="th" className="text-purple-400 hover:bg-purple-600/20">ไทย</SelectItem>
                <SelectItem value="en" className="text-purple-400 hover:bg-purple-600/20">English</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center space-x-2">
              <Switch
                checked={autoSpeak}
                onCheckedChange={setAutoSpeak}
                className="data-[state=checked]:bg-purple-600"
              />
              <span className="text-gray-300">
                {language === 'th' ? 'พูดอัตโนมัติ' : 'Auto-speak'}
              </span>
            </div>
          </div>

          {/* Text Input */}
          <Textarea
            value={text}
            onChange={handleTextChange}
            placeholder={language === 'th' ? 'พิมพ์ข้อความที่นี่...' : 'Type your text here...'}
            className="min-h-[200px] bg-black/20 border-purple-500/20 placeholder:text-gray-500 focus:border-purple-500"
          />

          {/* Voice Settings */}
          <div className="space-y-6 w-full">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Speed: {settings.rate.toFixed(1)}x</label>
              <Slider
                value={[settings.rate]}
                min={0.1}
                max={2}
                step={0.1}
                onValueChange={([value]) => handleSettingChange('rate', value)}
                className="w-full"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Pitch: {settings.pitch.toFixed(1)}x</label>
              <Slider
                value={[settings.pitch]}
                min={0.1}
                max={2}
                step={0.1}
                onValueChange={([value]) => handleSettingChange('pitch', value)}
                className="w-full"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Volume: {settings.volume.toFixed(1)}</label>
              <Slider
                value={[settings.volume]}
                min={0}
                max={1}
                step={0.1}
                onValueChange={([value]) => handleSettingChange('volume', value)}
                className="w-full"
              />
            </div>
          </div>

          {/* Playback Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {speaking ? (
                <>
                  {isPaused ? (
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={handleResume}
                      className="bg-black/20 border-purple-500/20 hover:bg-purple-600/20 button-glow"
                    >
                      <Play className="h-4 w-4 text-purple-400" />
                    </Button>
                  ) : (
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={handlePause}
                      className="bg-black/20 border-purple-500/20 hover:bg-purple-600/20 button-glow"
                    >
                      <Pause className="h-4 w-4 text-purple-400" />
                    </Button>
                  )}
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={handleStop}
                    className="bg-black/20 border-purple-500/20 hover:bg-purple-600/20 button-glow"
                  >
                    <Square className="h-4 w-4 text-purple-400" />
                  </Button>
                </>
              ) : (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={speak}
                  className="bg-black/20 border-purple-500/20 hover:bg-purple-600/20 button-glow"
                  disabled={!text || isTyping}
                >
                  <Play className="h-4 w-4 text-purple-400" />
                </Button>
              )}
            </div>
            {isTyping && (
              <div className="flex items-center gap-2 float">
                <RefreshCw className="h-4 w-4 animate-spin text-purple-400" />
                <span className="text-sm text-gray-400">
                  {language === 'th' ? 'กำลังพิมพ์...' : 'Typing...'}
                </span>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </main>
  );
}
