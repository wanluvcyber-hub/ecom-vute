<script setup>
import UserLayout from '@/layouts/UserLayout.vue';
import { ref ,onMounted} from 'vue';

const email = ref('')
const name = ref('')
const profileImageUrl = ref('https://scontent.fphs3-1.fna.fbcdn.net/v/t39.30808-6/706064615_122315223392008333_6277296808766203873_n.jpg?stp=dst-jpg_p526x296_tt6&_nc_cat=109&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFyDSoaImA0iuWPNCIBOgiAYpDNAy_JMcxikM0DL8kxzDITXcKux3ynUCSXqBft1000dBcTxDiYlxnD6iavB33z&_nc_ohc=eEUZnYK-Dm4Q7kNvwEhSB7k&_nc_oc=AdonbeN8s_gcwpIHVSfPcwHTKOv11KDtUrhw8CYPjxNspyqs_vPmuiIKN_lVf6PibKGFns2MVA-JKuYFvq4bAVPD&_nc_zt=23&_nc_ht=scontent.fphs3-1.fna&_nc_gid=-wozZQDhTsmwreBQO0ucwA&_nc_ss=7b2a8&oh=00_Af7PBRRQhHLRs5p57PtRsWTb4DMxG_L3o3BPK7Juqz0WUQ&oe=6A1878A1')
const handleFileUpload = (event) =>{
  const file = event.target.files[0]

  if(file){
    const reader = new FileReader()
    reader.onload = (e) =>{
      profileImageUrl.value = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const updateProfile = () =>{
  const profileData = {
    imageurl:profileImageUrl.value,
    name:name.value,
    email:email.value
  }
  localStorage.setItem('profile-data',JSON.stringify(profileData))
}

onMounted(() =>{
  let profileData = localStorage.getItem('profile-data')
  if(profileData){
    profileData = JSON.parse(profileData)
    profileImageUrl.value = profileData.imageurl
    name.value = profileData.name
    email.value = profileData.email  
  }
})
</script>

<template>
  <UserLayout>
    <div class="max-w-2xl mx-auto border border-base-200 shadow-xl">
      <div class="text-2xl"><b>Your Profile</b></div>

      <div class="flex flex-col items-center">
        <div class = "flex flex-col items-center">
          <div class="avatar">
  <div class="w-24 rounded-full">
          <img :src="profileImageUrl">
       </div>
          </div>
          <input type="file" @change="handleFileUpload">
        </div>
        <div>
          <label class="input validator w-full ">
            <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <g stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" fill="none" stroke="currentColor">
                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </g>
            </svg>
            <input type="email" placeholder="mail@site.com" required />
          </label>
          <div class="validator-hint hidden">Enter valid email address</div>
        </div>

         <div>
          <label class="input validator w-full ">
            <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <g stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" fill="none" stroke="currentColor">
                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </g>
            </svg>
            <input type="email" placeholder="mail@site.com" required />
          </label>
          <div class="validator-hint hidden">Nmae</div>
          <button class="btn btn-neutral w-full mt-4">Update profile</button>
        </div>
      </div>
    </div>
  </UserLayout>
</template>