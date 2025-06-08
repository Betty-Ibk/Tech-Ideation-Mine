import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: User | null = null;
  private refreshKey = 'lastRefresh';
  
  constructor(private router: Router) {
    // Try to restore user from localStorage
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      try {
        this.currentUser = JSON.parse(savedUser);
        
        // Check if this is a new session after refresh
        const lastRefresh = localStorage.getItem(this.refreshKey);
        const now = new Date().getTime();
        
        // If there's no refresh timestamp or it's been more than 2 seconds,
        // consider it a page refresh and clear the user
        if (!lastRefresh || (now - parseInt(lastRefresh)) > 2000) {
          this.logout();
        }
        
        // Update the refresh timestamp
        localStorage.setItem(this.refreshKey, now.toString());
      } catch (e) {
        localStorage.removeItem('currentUser');
        this.currentUser = null;
      }
    }
  }
  
  login(employeeId: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      // Debug log
      console.log('Auth service login attempt with:', employeeId, this.maskPassword(password));
      
      // Simulate API call
      setTimeout(() => {
        try {
          // Case-insensitive comparison for better user experience
          const empIdUpper = employeeId.toUpperCase();
          
          if (empIdUpper === 'ADMIN007' && password === 'adminpass') {
            console.log('Admin login successful');
            const user = {
              id: '2',
              name: 'John Adeniji',
              email: 'johnadeniji@gtcobank.com',
              role: 'admin',
              department: 'IT Administration',
              profileImage: 'data:image/jpeg;base64,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',
              joinDate: '2020-01-15',
              ideasSubmitted: 3,
              votesReceived: 23
            };
            localStorage.setItem('currentUser', JSON.stringify(user));
            resolve(user);
          } else if (empIdUpper === 'EMP1001' && password === 'userpass') {
            console.log('Employee login successful');
            const user = {
              id: '1',
              name: 'Temitayo',
              email: 'Temitayo@gmail.com',
              role: 'user',
              department: 'Innovation Department',
              profileImage: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUTExMWFRUVFxUWFRgVFxUXGBYYFRgXGBcYGBgYHSggGBolHhUYIjEhKCkrLi4uGB8zODMtNygtLisBCgoKDg0OGxAQGy0mICUvLS81LS8tLS4tLS8vLS0vLy0tKy0tLS0tLS0tNS0tLS8tLS0tLS0tLS0rLS0tLS0tLf/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAABQYDBAcIAgH/xABHEAABAwEFBAcFBQUGBQUAAAABAAIDEQQFEiExBkFRYQcTInGBkaEyUrHB8EJicpLRFCNDorIVMzRzwuEkgoPS8RZTY5Oj/8QAGQEBAAMBAQAAAAAAAAAAAAAAAAECAwQF/8QAJhEAAwACAgEDBQEBAQAAAAAAAAECAxESITEEQVETImFxoTKRgf/aAAwDAQACEQMRAD8A7iiIgCIiAIiIAiIgCw2m1sjGJ7w0cXEBVPbDbVlmBZGQZNCciGn5nl9HlF53rPaHFz3Oz3v18G7vrJZXlS6RtGF12zsVt27sUf8AExfhFQoifpSsg0Dj9c1x6UN31ceefpotSVw90eiy+rRt9GDsJ6XLOD/dP82/qpW6+kywSmjpDEfv6eYXn+SUcAtSVwPJSslEPFB6Cv3pNs8RLYWmZw31AZ4HMlQDelGYnOFoHJ5r8Fx67bUQ7ATUat+Y+uamcWSVVfImI+Drth6SojlIHs5+0P6vkrXde0UUwqyRknHCakd41Hi0DmvNslqppn3L4jvJzSCCQRoQaEJN0hWKX4PVkU7XaH6/Tmsq893B0hWmIjE4yNrmH694cMwefnVdi2V2rhtjeyaPGrDSvhxWs5E+jCsbnssSIi0MwiIgCIiAIiIAiIgCIiAIiIAiIgCp23O1HUN6mLOVwzp9mvzp5Ke2ivUWaB0h1pRo4uOnhv8ABcSvG3EudI81c4kmuZz3fXwAWOW9dI3w4+XbNeWpcXOOJ/Hc2vCvx1PotO0ygamv1wGqzNjc8VccDef1mvk0GUbKne52v15LmOojXskdo3COJy9FqS2dv2pKng0fopOeEnN7ieWg/wB1HWh7RvAClMho05YY+D/zfqVrSQN3Fw7+0PRZnzt3VPcD/wCFiNoHukfXJaLZR6NN4cxzXbq6jTNWFmbanyUNI8EVGm8LNZrUC2lCT6KX2iJemZLROBvC1/2kcV9mIncB3L8MDvqijol7P1toHIqVum8nxPD43FrhmKH6IUOYjy8Qvpgpq2nd/sp6I2z0tsLtY22xdqgmYO23j94BWleZNkr9fZZ2StNQDRw4tOoPxBXpOw2psrGvaahwBB7xUfFaxW+mc+SdPaNhERaGYREQBERAEREAREQBERAERY5pQ0VOiA5t0m3limbEDlGKkD3jQ+elO4qhRQFzsTsz9kbh/urBtFaBLaJX11cadw0UHbLzZEKangPmuCqdU9HoRKmUjO+IavOnooi33wxmTMz6eHFR89rltBIGTQczu7gN571kisLWZnM7zvU615J3vwaM08smuQWNtjqc8ypZkGLkFIWW766BVeTRecW/JBMu6qzMuUu3FXGyXNyUpBdQG5ZvKzX6UlDs2yQcaklTEex0NNCDxaaK5R2MDcshhVHlp+5KxwvY5/bNkXAVjkPc4A+tFXrXDLEaPb3bq9x0XWpYlFXhYmvBDgCDxVpzNeSKwp+Dmf7QN9R35/BfTZm8QpS+LjLDVmbeG8dxUIWfRXTLVLo5ampembsbWnMZH0K7j0Q3kZLKY3e1C7D4HtD4lcCjYAd4PLL/AMrqfQ3ezI53xONOtYKV1qwnLyJ8lpPVGVrcnZ0X401X6ug5QiIgCIiAIiIAiIgCIiALnW320+AmNpoBrTj9fWqvt4WkRxvkOjGud5Cq833pM+1Suc4kRg9o+8fdHJY5q9jfDO3s+LReT5SRHpvO7z/Ra0VjxOw1qftO3NHLmVsOfmIogK+jRxK2Mo24G57yd7jvJ+S596OvXyMLWigyA+vNYmjEeW5YZZRvOXxXxFesYNC7yzVHt+DSUl5J6wWPEVbLuuwAaKs3TtFZW0xPI72u/RXG6r4s8v8AdysceAIr5HNYNM1dL2NtlmAX31azr4eqkGBwWF6yyFassigsj4kK1JQtS335DHk6RoPCtT5BRcm1tn94/ld+ilSyeSRvWuz1BVMv678FXgd/crPBtDZ3mgkAPB3Z+K+rxs4e07wQtIbllaStaOeN5Gn1wWzZLQWEOFQQQQ5h0I0NNy1pYcL3MOrTTny9F8nE3NpXb5ODwehujnan9rhDXuBkZk/Tte6+m6tDXmrqvNvR1fXV22I1wEuDHDQHFpXxovSS2hvWmc+RJPaCIiuZhERAEREAREQBERAVzb604bFKK0Lm4a8MxU/XFcDtNoJIjjGmQ4NG8ldN6XbyNWQN1Oflp61P/IuYxYWZNP4ncSNfAfHuK5Mr3R2YVqTYiaImkDMn2idSfrctcOL34R4ngscryRUeug5k/RKx2a19WOz2nHVxrTwH6+SpwqvBr9SZf3Glb4pJXlrGnA005Gm9Z7Ls87e8AqRFjneKuOEHjl6Bfn9jiuEvzIr7O4a6nmrdJa5Efc3vj/16Pxmy7zo9vkVkbshaK1a5tRoQ4gjuOoX4y6HNP7uXCR3t9Wlb1jv+ezuDZ2428cg7vBHZd3Zd6o5p/wCXsurU/wC5a/qL1sqLQ2ANtLg54Jz1NN1TvKlnuUPdl6xysD2OqD6HgRuK3TOuR732dGvg/Znqs7VNnfGGwuw1PazoaU3FTNpnUFed4tY3E80G7iTwASU2+iz0l2U7/wBMy73N8yV+O2Yfve0ea3ZLwnnJ6oYGcd/i75Ba77nqe3IXHkK+pK7OLX+q1/Tl5Kv8S3/DWdsy/wCzIxx4VUrs06aJ3UStdgdXATUhpG6u4H4qObdDHVo/Q0zaKVHcVkNntVnGNj3YBqWElo72nL0U8VXXL+FedT25/wCPZh2lswEwOhcNeYy/RRzHEGjsue4rPed5PmDcYbVtc2ila01HhuWmy1AZO9njw7+S0mGlpmVZJqm0SNiYOsYdKOafIg5HgvUF3WnG0dw00OWq8sMBbShqNQeC710TW4zWQV/hfuvLMeTS0eCvD7Msq62XhERbGAREQBERAEREARF+FAcT6YpsFsyPafFGByFXVPoqRd9ldM9sTBm6mu4c1ZemFx/tJwOgjip3H6KitkLQBKW6OdoeWKhHquLI9bZ6GGeWkZdq9mn2Vkby8va4lp3BriKgAcDQ+S/NiLubLK97tIg0iumJ9cJ8MJ8wuh39drZbI+ImhcOxXc8Zs9R5Eqm9GNDLaIXgdtjDhO/AXteCP+oFMXyxv5KXCnKn7GltbeIiPVBpdI+mGhqRnlkM8VaUW/dmw08zWSWy0Fhc5oYxmEEOeQ1oLiKAkmmQW3Ds1HFe0Jc572FrizGHODXBpwgyHJ3IGp0U70lxH9nhAqG9cK04hj8PrVIUxDr4LZrqrS+Tm22932i67SI3TNIe0PYKuf2QS2j8QBrUHPLlwW3cV7R2lpjkAqRmNx+8065eiol/yvdM4yOc51QKvJcchpU50W7stC8uBZ7QkjDObnGhHcaiver5YnXJGeHNXLi+0WV/WWKfsmrTnno9vA/eGee7uKmP/WTP/bk//P8A7k2ohDrO2Te1zfJ+RHmB5JsrJEWUDBiFA4kA1NNa7wsqc1Cult+DeVc5HEvS8mKTatjvsSfyU9HKOsFmda5S+Q9hutPRg+Z/ULa2sEYIAaA851AAyqRnTXRSF1wubZgIx+8c0uH4nAmvgPgi4zG4Wm+g1VXxt7S7N++Lmlju59shMIZHXskmoa1xY6gAoXBw9mv6Lnl2Xk2SSs75Cw0DnROwuZzwkUcM9KcacFFX8+Rh6rG/qyA/Didhc41q4trQmu9YrjgcZBlkQa91P1otZmVHNGFZbq+LL/fuzVossfWQymaCmIigxhpzqKZEUOooVJbK21szMQoKZEVGWXwz3q47Jw1sFnx6dUNfdzw+GGipWytxxiaV4LurEh6tlHNbQGrTwkABy1AI4quSZ1s1w3W2itbTWEQ2h7WijTRwHAOGnnVYItnJJ4sYqK1p4ZV9CpXalvXW4xt+6yvCgq4+FT5K4FgYwNbk1oAbTgBkmXK5lfJGDCrut+Dl12BzKxPyLDRd06E2Uss3OWv8oHyXI9o4v+JxD7TGOPfmPkF2bodhIsJPvSOp4ABXx1yaZnmnimi9oiLoOQIiIAiIgCIiAIiIDkPTpchrFbWioA6mWm4VLo3HxJHkuUMtDo3NkZq01/Udy9V3lYWTxPilaHMkaWuB3g/A76rzttZsfLYpTHm9hBMbvfYN4+8N48RkQsMke504cnsdM2avKO2QRyspVp7Td7XUoQfiqZf0f9nXpHaaUilJLqbmvo2YeBIeqvstfz7FMHtzjdQPbuI+R4Hd3Lqt7wwXlZaMcMxjjdTNj2jQjzBHA9y54XCvwzoybtdeURm1cHWSNe1xDo+1GWka6g14aKVsF4R22A2e0jq5DQHdVzdHxk6io0/Vc9uu9n2d4s9pq3B2GuP2QNGk8ODtKUVwDWuFciquqxtp9pmyxxlhNdNfxlbv/o6lc+vVdZ96N7W17w4gj6zUhs/sn+ykSTYWllerjaahpP2nO3u5eNdKSnWyD2ZHgcMRp6rDI4AF80hwjM4jkom5Xjf4W+irwV5bX70Q21zg2zYffeKdze0fl5rR2SiNDzzWrelpfbZ2tiacDeywd+rj3/JXm7bg6mHDSriBUjd5K2R8Y4e77ZGJcsjv28Ip22EHsP4VafHMfBSmyd4NBgc4gAChrxDSxZL1gDwWO3/HiFUQXQOLJB2Sa1/1DkVON8oSXldk5Z4W2/FLX/pZ9pej8yOLoWiWMklrcQY+OuoBJo5vjwy3rLcWwDqATNEMYpi7TXPcB9kYTRteJKwXbbZA0dXO/Duo4keC3ZJHv9uR7xwLiR5aKKqPz+t9CcF+dr9+5IbVX72P2eyiooGlzcmtaKDC06VoKDctC5yyzQvcSS1oLjWlTyqNSTl4rDI9rRnQAeQUNPK+2PbZ4fZrVzt34jyG4byrTTyPvwTcThjS8mbY6yF7pbXIK1LgMtXONXkfDxKl7S89mManXlVTMNjZEwQxjssyHE01J5k5qq37eTI8UcZq81D3+7xAPvcTuz36ZZG8ldF8GscdkXaLOZ7QcALi5zYogPtH2RTlqfFehNnLrFms0UA+w0Ani7Vx8TVUfov2SLKWydtHEfuGEZtDtZCNznDQbh35dKXbijSPNz5OT0ERFsYBERAEREAREQBERAFH31dEVpjMcoqNWkUxMcNHNO4ivxG9SCIDgu2OxEkLzQVJ9mgo2b8I+zJxZv3V3Qmyl7GyShxLjEah4AqRkRWnL64L0bbrGyVjmSNDmuGYK5Jt9sp+znr25sJo6uuehJ3nnrp3rmyY9do68OXb0/JmvG7ILXGCaGoqx7aVoeB3jkVWJNmbTDlBMcO4AkfymrVj2WvZ0Uzoc3ROBeB7hrQ05EkGiv0Lg4VXJzqOvY9BzF/drv8ABQ2WG8TliPiWfILfsmxc8pBtExpwBJProrsxoC+ZLQ5tKNLhvpqOdN6j61e2l+ijxS/l/tn3cdxQ2dtI20O8nMnxWzbbW0VaDmv2C2MI9oDvPyWG1TxH7QVOyyh78Fft1mDzlqFo2m6WStwvFeB3juKlp3trkQtd87WipcB9bhvULa7Rs5bWmipWjZORhJhkI8wfGmR8lg/s62jLrD5s/wC1XmF2JtaEV3HVfL4lr9avfT/8MVgheNr9MpLLhlef30pI4VJ/QDyVr2esbIfZFAM3HeaCpJPcFm6hb8F1yyxuZEO08YakGjQfaJ8MvFWm6tpE1OPHLa8/LOex39apI6SENL65RNIkfxDSXGnN2WHea9kXvYDo7OJtqtrQCKGKDc0CmEv8h2fE8BbdmNi4bLR7v3kuXbduppTu8huAVpXbGNI8zJmb6R+AL9RFqc4REQBERAEREAREQBERAEREAVM6UbY1tjcw5l9MvHVXGR4AJJoAKkncBquNbbXm+1StjiBfJM7DEzgzQOPCvteHILLK+tfJriW638GDoouMWmW1PeMmMZG13B73F7gO4NHg8KyWu7ZLO7C4ZbjuI5K27GbOtsNlZA04ne1K/wB+R1MTu7cBuACmLRZ2vGF4DhwKpfp1U/k1j1Lmn8HPY5VsxFSd4bMEdqE1+6dfA71DODmHC9paeBFFw3iqPJ3Rlm/DM1pia4ZtB79fMZhQ1psY3FzfGvxUw19V8SMCqqN4y1JXnWAn7Tj6fALNZ7A1udKnic/ipGRtFgJRvZestUEX401c1tQC8hrakCrjoBXerbdeywFHTGp90aeJ3q8Yqvwc2TNOPyQtz3O+Y6UaNXH5cSr1Y7K2Noa0UA8zzKyRxhoAAAA0AyC+16GLCoX5PNzZ6yP8BERamAREQBERAEREAREQBERAEREAREQFW6RLy6myEA0MrhHrTs0Lnk8sLTXkVHdG+zJjabXOKzzDs1/hx7mjgSKV8ty+ukexulfYx/D6+MSf9SWJufLD1iuzG0FBoFRL7tl3Wp0j6REVygWG02VjxR7Q4cx8OCzIUa2E9FVvu4mRtxxucM9DmP1VVlthbkVcb2vaKVjmxvDsLqOpoDw5ql22PNeZ6hSq+09b0rpz9xhkt6pu1e1M8UzoY8LQ0N7VKuOJodlXIa8FY5siqntjc0skvWxAPrGHFrSMfYFCQ37VA3QVPJRglVXZfO3M9EKy3Pc/G57nYt5cSQ4Zih3cqaL0D0b7UftcGCR1ZYwKk6vboHfiFKO50OjgvOFmNQ7l2h4Z/AlXHYXaAWWXETQtOMakObkJGHvbip95rOC65fFnDc8kej0XzE8OAINQQCDxBzC+l0nIEREAREQBERAEREAREQBERAEREAREQGK02dr2lrhUFZAF+ogCIoW9NqbLBk+Zpd7jCHO8QNPGiAlp5msaXOIa1oqSTQADeVUbg2pdbrXOyIAWaBgFSO1JJITQ/daA12WpqO5ULbfbKS01aOzEDkwb+bjvPoFIdBs1TbRvxQu9HD5ISaF3Y7NbLRA85GQub+FxJb5A08FNWh1VvbeXfG+VjmEC0BpLW73tFKt7948VBWS04gvM9Tjc1+z1/T2rj8owW1q0NnbK+S3sfnhia5x7zk0d9TXwKnJYcWQ1Oilrks8bGERkOOKkjuLqDT7tDl4q3pIdVv2RHqsimNe7OW7X3Q2G3zMZQNkHWMG4iUHE3kQ/HlwooKxPwyMJGhzB5GpB/MrD0o2j/jm0+zE0epKi7I9kuEvycKUdx0ydx011XbcfB58ZNdM9IbHvrYrPyja0dzOyPRoUyqvsNfFnfZoYmTMMjGND2Yhja7VwLTnrXPRWhXXgxryERFJAREQBERAEREAREQBERAEREAREQBUXa7pEis5McIEsgqCa9hp8PaP1VZOk3aI2eEQxmj5AakatZp5nTwK4VaZy4lQSWC+dtLXaCcczsPutOFvk3XxqtCzPIFTqfQfXyUXC3PPTf3BJ71Y2tTnyUEma851bOg63htrtLCcnQh3/ANbs/wCpc2tl5h2isHRrOWWvDWgmicyu/MsJ9AVZEHVrLZ32u1unNQ0O7Hc05U+PitO+bJ1dse0CgdSQf8w7X8wcrtYY2taA0UAGShNq4e3DJzcw+IxD4HzWPq55Y/0dPpL45NfJo2Syl1e74/7VWe7LA6N786te3+ZubfQuHiFI3dD2K8ST5ZfqthzVb0s8ca/PZX1NcsjPPu3Nrx26U+7hb5AH5rRscq29vnMFvtOEUaJMu/C3EPzVCg4bTRaGBNvtB9oEgt86birFcXSLbrPQCYvaPsy9seZzHgVTo7UCvmTIoD0dsb0jQWwiN4EMxyAJq15+647+R9VdwvIFjtJaQQV6N6MdpjbLNhkNZYaNed7mmuF3flQ8xXehBckREAREQBERAEREAREQBERAERa9vtHVxPk9xjnflBPyQHCOki9OttcprkHYG9zOz8QT4qlMNSpC+piXE8SVGQO7Q8lBJsyMyWibA3l4KWezJaT0BpuszQty55ertMDv/kaPz9n5rEsNodSjhq0gjvGY+CkHpS7X1YDyCwbSxVs7jvYWv/K4V9CV87PS44I3DRzWnzCk54Q9jmHRzXN8xRLnlLRaK40ma9hipGz8IPnn819PbTXRbNnoWNI0IHwUZtTaepslok9yKQjvwkD1IUytLRFPb2ebL0m62aWQ/bke78zifmtTqQspX4oIPhsAWcjJY1nw5KSDXrmuk9Dl7dVbmNJ7MoMZ7zm31AHiuaOKmtmLZ1U8cnuPY/8AK4H5Iwes0XzG+oBGhAI8V9KAEREAREQBERAEREAREQBQG3dpwWGY8Whv5iB8KqfVI6WrRhsbW+9KPJrXH40QHCLxdUlRr30K3bY7NRVrcoJLaW1iY/c4VUTOM1vXNMXWKOu50oHdir8SVpz6qCTWKxTjJZHL4cpIO39GNtEl3w55tBYe9hLfkra2ai5Z0NW/sTQk+w8PA5SA/NpXTnMDtVcGa7vZI3BzgO6tR6EKpdL1t6u73NrnK9kY9Xn0jKtth/ifj/0tXLenO352eDgHynx7Df8AWoYOSkohX4oIPtq25hRhPD5rTi1WzechEAA3vbX8rvrwUg0QtywOo5aEZyWzZjmhB6x2QtXW2KzP4xMB72jCfUKYVM6IrVju2Me46Rn82If1K5qCQiIgCIiAIiIAiIgCIiALnnTH/h4fxu/pRFDJRwy1aqLtuiIgLLcf+Ci/FL/UVq2jVEUEmq5fBRFJBcuiH/FT/gj/AKnrs0a/EV0DLYtZPxf6GLi3TV/jm/5Mf9UiIjBzxERVIP2BbF6/3I/zG/0vRFII+LRbEGqIhB6J6Ef8C/8Aznf0sXQkRQSEREAREQBERAf/2Q==',
              joinDate: '2021-03-10',
              ideasSubmitted: 3,
              votesReceived: 20
            };
            localStorage.setItem('currentUser', JSON.stringify(user));
            resolve(user);
          } else {
            console.log('Login failed: Invalid credentials');
            reject(new Error('Invalid credentials'));
          }
        } catch (error) {
          console.error('Login error in service:', error);
          reject(error);
        }
      }, 1000);
    });
  }
  
  logout(): void {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
    localStorage.removeItem(this.refreshKey);
    // Navigate to login page after logout
    this.router.navigate(['/login']);
  }
  
  isLoggedIn(): boolean {
    const user = localStorage.getItem('currentUser');
    return !!user;
  }
  
  isAdmin(): boolean {
    const user = localStorage.getItem('currentUser');
    if (!user) return false;
    
    try {
      const userData = JSON.parse(user);
      return userData.role === 'admin';
    } catch (e) {
      return false;
    }
  }
  
  getCurrentUser(): any {
    const user = localStorage.getItem('currentUser');
    if (!user) return null;
    
    try {
      return JSON.parse(user);
    } catch (e) {
      return null;
    }
  }

  // Helper method to mask password in logs
  private maskPassword(password: string): string {
    return password ? '*'.repeat(password.length) : '';
  }
}







