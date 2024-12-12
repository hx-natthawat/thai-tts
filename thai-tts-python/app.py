import streamlit as st
from gtts import gTTS
import os
import tempfile

st.set_page_config(page_title="Thai Text to Speech Converter", page_icon="🎧")

st.title("Thai Text to Speech Converter")
st.write("พิมพ์ข้อความหรือเลือกข้อความเพื่อแปลงเป็นเสียง")

# Text input
text_input = st.text_area("ใส่ข้อความที่นี่:", height=150, help="พิมพ์หรือวางข้อความภาษาไทยที่ต้องการแปลงเป็นเสียง")

# Voice selection
voice_option = st.selectbox(
    "เลือกเสียง:",
    options=["หญิง", "ชาย"],
    index=0
)

# Language is set to Thai
language = "th"

def text_to_speech(text, voice_type):
    # Set voice based on selection (male voice is achieved by slowing down the speech rate)
    tts_config = {
        "text": text,
        "lang": language,
        "slow": voice_type == "ชาย"  # Slower speed for male voice simulation
    }
    
    tts = gTTS(**tts_config)
    
    # Save to temporary file
    with tempfile.NamedTemporaryFile(delete=False, suffix=".mp3") as fp:
        tts.save(fp.name)
        return fp.name

# Convert button
if st.button("แปลงเป็นเสียง"):
    if text_input.strip() != "":
        try:
            audio_file = text_to_speech(text_input, voice_option)
            
            # Display audio player
            with open(audio_file, "rb") as f:
                audio_bytes = f.read()
            st.audio(audio_bytes, format="audio/mp3")
            
            # Clean up the temporary file
            os.remove(audio_file)
            
            st.success("แปลงข้อความเป็นเสียงสำเร็จ!")
        except Exception as e:
            st.error(f"เกิดข้อผิดพลาด: {str(e)}")
    else:
        st.warning("กรุณาใส่ข้อความที่ต้องการแปลงเป็นเสียง")

# Instructions
st.markdown("""
### วิธีใช้งาน:
1. พิมพ์หรือวางข้อความในช่องข้อความ
2. เลือกเสียงที่ต้องการ (ชาย/หญิง)
3. กดปุ่ม 'แปลงเป็นเสียง'
4. ใช้เครื่องเล่นเสียงเพื่อฟังเสียงที่แปลง
""")

# Footer
st.markdown("---")
st.markdown("พัฒนาด้วย ❤️ โดยใช้ Streamlit และ gTTS")
